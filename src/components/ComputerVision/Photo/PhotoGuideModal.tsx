import React, {
  useState,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Box,
  Input,
  Text,
  Heading,
  Image as ChakraImage,  
} from '@chakra-ui/react';

// 카메라 페이지에서는 카메라 촬영을, 갤러리 페이지에서는 사진 업로드 할 수 있도록 분리함 
type SourceMode = 'camera' | 'gallery';
type ButtonRole = 'take' | 'retake' | 'confirm';

interface PhotoGuideModalProps {
  children?: React.ReactNode;
  // 업로드 시 파일 객체 반환
  onImageUpload?: (file: File) => void;              
  // 크롭 완료 시 데이터 URL 반환
  onCrop?: (dataUrl: string | null) => void;         
  // camera | gallery 모드
  source?: SourceMode;                               
  accept?: string;               
  initialImage?: string;                 
  title?: string;
  content?: React.ReactNode;
}

// 부모가 ref로 안쪽 함수를 직접 호출할 수 있도록 함
// cropToGuide를 밖에서도 호출 가능하도록 한 것임
export const PhotoGuideModal = forwardRef<{ cropToGuide: () => Promise<string | null> }, PhotoGuideModalProps>(
  ({ children, onImageUpload, onCrop, source = 'gallery', accept = 'image/*', initialImage, title, content }, ref) => {

  // 업로드된 이미지 문자열로 저장
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // 이미지가 들어가있는 사각형 박스 DOM 
  const containerRef = useRef<HTMLDivElement>(null);
  // 실제 이미지 태그 
  const imgRef = useRef<HTMLImageElement>(null);

  // 원래 이미지의 가로/세로 크기를 저장 (정확한 크롭을 계산하기 위해)
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | null>(null);
  // 크롭 박스 사이즈 
  const CROP_SIZE = 128;

  // 업로드한 이미지를 왼/오/위/아 얼마나 이동했는지 저장
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragStartRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);

  // 줌하여 확대할 수 있도록 함
  const [zoom, setZoom] = useState(1);
  const MIN_ZOOM = 1;
  const MAX_ZOOM = 4;

   const pinchRef = useRef<{
    startDist: number;
    startZoom: number;
    focalX: number;
    focalY: number;
    startPanX: number;
    startPanY: number;
   } | null>(null);


  // 이미지 파일 선택 처리 (클릭 업로드만 유지)
  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const dataUrl = e.target?.result as string;
        setSelectedImage(dataUrl);
        // 새 이미지 로드시 팬 초기화
        setPan({ x: 0, y: 0 }); 
        setZoom(1);
        onImageUpload?.(file);

        // 원본 이미지 크기 저장
        const probe = new Image();
        probe.onload = () => {
          setNaturalSize({ w: probe.naturalWidth, h: probe.naturalHeight });
        };
        probe.src = dataUrl;
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  // 파일을 선택하면 실행함 
  const handleFileInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  // 컨테이너 클릭해서 업로드 전이면 파일을 선택하고 업로드 후면 무시함
  const handleContainerClick = useCallback(() => {
    // 업로드 후에는 무시
    if (selectedImage) return;          
    fileInputRef.current?.click();
  }, [selectedImage]);

  // 현재 화면의 이미지가 어떻게 깔린 것인지 계산 
  const getLayout = useCallback(() => {
    if (!containerRef.current || !naturalSize) return null;
    // 화면에서 컨테이너 박스의 실제 픽셀 크기를 불러옴
    const rect = containerRef.current.getBoundingClientRect();
    const containerW = rect.width;
    const containerH = rect.height;
    // 이미지 원본 크기 
    const { w: natW, h: natH } = naturalSize;

    // 이미지를 꽉 채우도록 비율 조정
    const scale = Math.max(containerW / natW, containerH / natH);

    // 사용자 확대 배율 적용
    const totalScale = scale * zoom;

    const displayedW = natW * totalScale;
    const displayedH = natH * totalScale;

    // 이미지가 컨테이너보다 커진만큼 좌우/상하로 이동 
    const offsetX = Math.max(0, (displayedW - containerW) / 2);
    const offsetY = Math.max(0, (displayedH - containerH) / 2);

    return { containerW, containerH, scale, totalScale, displayedW, displayedH, offsetX, offsetY };
  }, [naturalSize, zoom]);

  // pan을 배치 한계 내로 고정힘
  const clampPan = useCallback((x: number, y: number) => {
    const L = getLayout();
    if(!L) return {x, y};
    const {offsetX, offsetY} = L;
    return{
      x: Math.max(-offsetX, Math.min(offsetX, x)),
      y: Math.max(-offsetY, Math.min(offsetY, y)),
    };
  }, [getLayout]);

  // 이미지를 드래그하여 위치를 바꿈 
  const onPointerDown = useCallback((clientX: number, clientY: number) => {
    if (!selectedImage) return;
    dragStartRef.current = { x: clientX, y: clientY, panX: pan.x, panY: pan.y };
  }, [selectedImage, pan]);

  // 드래그를 어디서 시작했는지, 이미지가 어디에 있었는지를 저장함
  const onPointerMove = useCallback((clientX: number, clientY: number) => {
    if (!dragStartRef.current) return;

    const dx = clientX - dragStartRef.current.x;
    const dy = clientY - dragStartRef.current.y;

    const next = clampPan(dragStartRef.current.panX + dx, dragStartRef.current.panY + dy);
    setPan(next);
  }, [clampPan]);

  // 허용 범위 안에서 이미지 위치 업데이트함 
  const onPointerUp = useCallback(() => {
    dragStartRef.current = null;
  }, []);

  // 두 손가락 터치 핀치 줌 추가함 
  type Point = { clientX: number; clientY: number };
  const dist2 = (t1: Point, t2: Point) => {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.hypot(dx, dy);
  };

  // 컨테이너 좌표에서 포인트를 유지하도록 pan을 보정함
  const setZoomAround = (newZoom: number, focalX: number, focalY: number) => {
    const L = getLayout();
    if(!L) return;

    const {containerW, containerH, scale} = L;

    const prevZoom = zoom;
    const prevTotal = scale * prevZoom;
    const nextZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
    const nextTotal = scale * nextZoom;

    // 현재 focal 지점에 대응하는 이미지 좌표
    const { offsetX: prevOffX, offsetY: prevOffY } = L;

    const imgX = (focalX + prevOffX - pan.x) / prevTotal;
    const imgY = (focalY + prevOffY - pan.y) / prevTotal;

    if (!naturalSize) return;
    const nextDisplayedW = naturalSize.w * nextTotal;
    const nextDisplayedH = naturalSize.h * nextTotal;
    const nextOffX = Math.max(0, (nextDisplayedW - containerW) / 2);
    const nextOffY = Math.max(0, (nextDisplayedH - containerH) / 2);

    let nx = focalX - (imgX * nextTotal - nextOffX);
    let ny = focalY - (imgY * nextTotal - nextOffY);

    const clamped = (() => {
      const offX = nextOffX;
      const offY = nextOffY;
      return {
        x: Math.max(-offX, Math.min(offX, nx)),
        y: Math.max(-offY, Math.min(offY, ny)),
      };
    })();
  
    setZoom(nextZoom);
    setPan(clamped);
  };

  // (PC 버전 DOM 이벤트 바인딩 )
  // 마우스를 눌렀을 경우 호출
  const handleMouseDown = useCallback((e: React.MouseEvent) => onPointerDown(e.clientX, e.clientY), [onPointerDown]);
  // 마우스를 움직일 경우 호출
  const handleMouseMove = useCallback((e: React.MouseEvent) => onPointerMove(e.clientX, e.clientY), [onPointerMove]);
  // 마우스를 눌렀을 경우 호출
  const handleMouseUp   = useCallback(() => onPointerUp(), [onPointerUp]);

  // (Mobile 버전 DOM 이벤트 바인딩 )
  // 손가락으로 화면을 터치할 경우 좌표를 뽑아 호출
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!selectedImage) return;
    if (e.touches.length === 1) {
      const t = e.touches[0];
      onPointerDown(t.clientX, t.clientY);
    } else if (e.touches.length === 2) {
      const [t1, t2] = [e.touches[0], e.touches[1]];
      const d = dist2(t1, t2);
      const rect = containerRef.current!.getBoundingClientRect();
      const focalX = ((t1.clientX + t2.clientX) / 2) - rect.left;
      const focalY = ((t1.clientY + t2.clientY) / 2) - rect.top;
  
      pinchRef.current = {
        startDist: d,
        startZoom: zoom,
        focalX,
        focalY,
        startPanX: pan.x,
        startPanY: pan.y,
      };
    }
  }, [onPointerDown, selectedImage, zoom, pan.x, pan.y]);

  // 손가락으로 움직일 경우 호출
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!selectedImage) return;
  
    if (e.touches.length === 2 && pinchRef.current) {
      e.preventDefault(); // 모바일 브라우저 기본 확대/스크롤 방지
      const [t1, t2] = [e.touches[0], e.touches[1]];
      const d = dist2(t1, t2);
      const rect = containerRef.current!.getBoundingClientRect();
      const focalX = ((t1.clientX + t2.clientX) / 2) - rect.left;
      const focalY = ((t1.clientY + t2.clientY) / 2) - rect.top;
  
      const ratio = d / pinchRef.current.startDist;
      const targetZoom = pinchRef.current.startZoom * ratio;
  
      setZoomAround(targetZoom, focalX, focalY);
    } else if (e.touches.length === 1 && !pinchRef.current) {
      const t = e.touches[0];
      onPointerMove(t.clientX, t.clientY);
    }
  }, [onPointerMove, selectedImage]);

  // 손가락을 뗄 때 호출
  const handleTouchEnd = useCallback(() => {
    pinchRef.current = null;
    onPointerUp();
  }, [onPointerUp]);

  // 마우스/트랙패드 췰 줌 
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!selectedImage) return;
  
    // 트랙패드 제스처 배려: deltaY로 확대/축소
    // ctrlKey 조건을 붙이고 싶으면 if (!e.ctrlKey) return; 형태로 제한 가능
    e.preventDefault();
  
    const L = getLayout();
    if (!L) return;
  
    // 가운데 기준으로 줌
    const focalX = L.containerW / 2;
    const focalY = L.containerH / 2;
  
    const step = -e.deltaY * 0.0015; 
    const targetZoom = zoom * (1 + step);
  
    setZoomAround(targetZoom, focalX, focalY);
  }, [selectedImage, zoom, setZoomAround, getLayout]);

  // 중앙 128px x 128px 가이드라인 영역만 잘라서 돌려줌 (크롭 기능)
  const cropToGuide = useCallback(async (): Promise<string | null> => {
    const L = getLayout();
    if (!selectedImage || !containerRef.current || !imgRef.current || !naturalSize || !L) return null;
  
    const { containerW, containerH, totalScale, offsetX, offsetY } = L;
  
    const guideLeft = (containerW - CROP_SIZE) / 2;
    const guideTop  = (containerH - CROP_SIZE) / 2;
  
    // pan은 화면 좌표에서 이미지가 이동한 양, offset은 이미지가 컨테이너를 넘치는 여유
    // 원본 좌표 = (화면좌표 + offset - pan) / totalScale
    const srcX = (guideLeft + offsetX - pan.x) / totalScale;
    const srcY = (guideTop  + offsetY - pan.y) / totalScale;
    const srcSize = CROP_SIZE / totalScale;
  
    const canvas = document.createElement('canvas');
    canvas.width = CROP_SIZE;
    canvas.height = CROP_SIZE;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
  
    const img = imgRef.current;
    ctx.drawImage(img, srcX, srcY, srcSize, srcSize, 0, 0, CROP_SIZE, CROP_SIZE);
    return canvas.toDataURL('image/png');
  }, [selectedImage, naturalSize, pan, getLayout]);  

  // 부모에서 ref로 cropToGuide 호출 가능하도록 노출
  useImperativeHandle(ref, () => ({
    cropToGuide
  }));

  // 버튼에 역할을 부여하여 클릭 시 각각의 역할을 부여함 
  const injectButtons = (nodes: React.ReactNode) =>
    React.Children.map(nodes, (child) => {
      if (!React.isValidElement(child)) return child;

      // 역할을 부여하여 각 역할에 맞게 onClick을 부여함, 아니면 그대로 반환함 
      const role = (child.props as any)['data-role'] as ButtonRole | undefined;

       // 업로드 후에는 take 숨김
      if (role === 'take' && selectedImage) return null;           
      // 업로드 전에는 retake/confirm 숨김
      if ((role === 'retake' || role === 'confirm') && !selectedImage) return null;
      
      const stop = (e: any) => e?.stopPropagation?.();
      
      if (role === 'take') {
        return React.cloneElement(
          child as React.ReactElement<{ onClick?: (e: any) => void }>,
          {
            ...(child.props || {}),
            onClick: (e: any) => {
              // 기존 onClick 먼저 보존 실행
              (child.props as any)?.onClick?.(e);
              stop(e);
              if (fileInputRef.current) fileInputRef.current.value = ''; 
              handleContainerClick();
            },
          }
        );
      }
      
      // 역할이 retake라면, 내부 상태를 싹 초기화하고 파일 선택창을 다시 띄움 (camera모드라면 카메라 앱이 열리도록 함)
      if (role === 'retake') {
        return React.cloneElement(
          child as React.ReactElement<{ onClick?: (e: any) => void }>,
          {
            ...(child.props || {}),
            onClick: (e: any) => {
              (child.props as any)?.onClick?.(e);
              stop(e);
              setSelectedImage(null);
              setNaturalSize(null);
              setPan({ x: 0, y: 0 });
              setZoom(1);
              if (fileInputRef.current) fileInputRef.current.value = '';
              fileInputRef.current?.click();
            },
          }
        );
      }

      // 역할이 confirm이라면 현재 화면 기준으로 크롭된 이미지 데이터 url을 onCrop으로 콜백함 
      if (role === 'confirm') {
        return React.cloneElement(
          child as React.ReactElement<{ onClick?: (e: any) => void }>,
          {
            ...(child.props || {}),
            onClick: async (e: any) => {
              (child.props as any)?.onClick?.(e);
              stop(e);
              const result = await cropToGuide();
              onCrop?.(result || null);
            },
          }
        );
      }

      return child;
    });

  return (
    <>
    {/* wrapper */}
    <Box
      w="100%"
      h="100%"
      px="2.81rem"
      boxSizing="border-box"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {/* modalWrapper */}
      <Box
        position="relative"
        borderRadius="1.25rem"
        p="1.75rem 1rem 1rem 1rem"
        bg="bg.bg3"
        w="100%"
        h="auto"
        maxW="22.5rem"
        boxSizing="content-box"
        alignItems="flex-start"
      >
        {/* contentWrapper */}
        <Box px="3.22rem" w="100%" h="100%">
          <Heading
            color="text.text1"
            textStyle="body_168001"
            textAlign="center"
            mb="1rem"
            mt="-0.5rem"
          >
            {title}
          </Heading>

          {/* 이미지 영역 */}
          <Box
            ref={containerRef}
            w="100%"
            maxW="9.375rem"
            aspectRatio="1 / 1"
            m="0 auto 1rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            overflow="hidden"
            touchAction="none" // 이미지 이동 드래그 시 페이지 스크롤 방지함
            cursor={selectedImage ? 'default' : 'pointer'}
            onMouseDown={selectedImage ? handleMouseDown : undefined}
            onMouseMove={selectedImage ? handleMouseMove : undefined}
            onMouseUp={selectedImage ? handleMouseUp : undefined}
            onMouseLeave={selectedImage ? handleMouseUp : undefined}
            onTouchStart={selectedImage ? handleTouchStart : undefined}
            onTouchMove={selectedImage ? handleTouchMove : undefined}
            onTouchEnd={selectedImage ? handleTouchEnd : undefined}
            onWheel={selectedImage ? handleWheel : undefined}
          >
            {selectedImage ? (
              <>
                {/* 즉시 실행 함수로 이미지 배치를 계산함 */}
                {(() => {
                  const L = getLayout();
                  const left = L ? -L.offsetX + pan.x : 0;
                  const top = L ? -L.offsetY + pan.y : 0;
                  const w = L ? L.displayedW : '100%';
                  const h = L ? L.displayedH : '100%';
                  return (
                    <ChakraImage
                      ref={imgRef}
                      src={selectedImage}
                      alt="업로드된 이미지"
                      position="absolute"
                      userSelect="none"
                      pointerEvents="none"
                      draggable={false}
                      style={{ left, top, width: w as number | string, height: h as number | string }}
                      onLoad={(e) => {
                        const target = e.currentTarget;
                        setNaturalSize({
                          w: (target as HTMLImageElement).naturalWidth,
                          h: (target as HTMLImageElement).naturalHeight,
                        });
                      }}
                    />
                  );
                })()}
                {/* 사진 크롭 가이드라인 */}
                <Box
                  position="absolute"
                  left="50%"
                  top="50%"
                  w={`${CROP_SIZE}px`}
                  h={`${CROP_SIZE}px`}
                  transform="translate(-50%, -50%)"
                  pointerEvents="none"
                  zIndex={2}
                >
                  {/* 네 귀퉁이 corner들 */}
                  <Box
                    position="absolute"
                    w="28px"
                    h="28px"
                    border="4px solid #43D2DA"
                    left={0}
                    top={0}
                    borderRight="none"
                    borderBottom="none"
                    borderTopLeftRadius="12px"
                  />
                  <Box
                    position="absolute"
                    w="28px"
                    h="28px"
                    border="4px solid #43D2DA"
                    right={0}
                    top={0}
                    borderLeft="none"
                    borderBottom="none"
                    borderTopRightRadius="12px"
                  />
                  <Box
                    position="absolute"
                    w="28px"
                    h="28px"
                    border="4px solid #43D2DA"
                    left={0}
                    bottom={0}
                    borderRight="none"
                    borderTop="none"
                    borderBottomLeftRadius="12px"
                  />
                  <Box
                    position="absolute"
                    w="28px"
                    h="28px"
                    border="4px solid #43D2DA"
                    right={0}
                    bottom={0}
                    borderLeft="none"
                    borderTop="none"
                    borderBottomRightRadius="12px"
                  />
                </Box>
                {/* 바깥 마스킹 */}
                <Box position="absolute" inset={0} pointerEvents="none" zIndex={1} />
              </>
            ) : (
              <ChakraImage
                src={initialImage}
                alt="초기 이미지"
                w="100%"
                h="100%"
                objectFit="contain"
                userSelect="none"
                pointerEvents="none"
                draggable={false}
              />
            )}
          </Box>

          {/* 파일 선택 / 카메라 촬영을 담당하는 입력창(숨겨져있음) */}
          <Input
            ref={fileInputRef}
            type="file"
            accept={accept}
            {...(source === 'camera' ? { capture: 'environment' as any } : {})}
            onChange={handleFileInputChange}
            display="none"
          />

          {/* 안내 텍스트 */}
          {/* <Text
            color="text.text1"
            textStyle="body_14700120"
            whiteSpace="nowrap"
            overflow="visible"
            textOverflow="clip"
            wordBreak="break-all"
            textAlign="center" 
          >
            {content}
          </Text> */}
          <Box display="flex" justifyContent="center" textAlign="center" mt="0.75rem">
            <Text
              color="text.text1"
              textStyle="body_14700120"
              whiteSpace="pre-line"
              wordBreak="keep-all"
              lineHeight="1.5"
            >
              {content}
            </Text>
          </Box>
        </Box>

        {/* 버튼 영역 - children에 역할별 클릭 이벤트 주입 */}
        <Box display="flex" gap="0.5rem" justifyContent="center" mt="1.5rem" px="0.5rem">
          {injectButtons(children)}
        </Box>
      </Box>
    </Box>
  </>
  );
});

