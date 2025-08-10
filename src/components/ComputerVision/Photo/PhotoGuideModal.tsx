/** @jsxImportSource @emotion/react */
import React, {
  useState,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { css } from '@emotion/react';

// 카메라 페이지에서는 카메라 촬영을, 갤러리 페이지에서는 사진 업로드 할 수 있도록 분리함 
type SourceMode = 'camera' | 'gallery';

interface PhotoGuideModalProps {
  children?: React.ReactNode;
  // 업로드 시 파일 객체 반환
  onImageUpload?: (file: File) => void;              
  // 크롭 완료 시 데이터 URL 반환
  onCrop?: (dataUrl: string | null) => void;         
  // camera | gallery 모드
  source?: SourceMode;                               
  accept?: string;                                   
}

// 부모가 ref로 안쪽 함수를 직접 호출할 수 있도록 함
// cropToGuide를 밖에서도 호출 가능하도록 한 것임
export const PhotoGuideModal = forwardRef<{ cropToGuide: () => Promise<string | null> }, PhotoGuideModalProps>(
  ({ children, onImageUpload, onCrop, source = 'gallery', accept = 'image/*' }, ref) => {

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

  // 이미지 파일 선택 처리 (클릭 업로드만 유지)
  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const dataUrl = e.target?.result as string;
        setSelectedImage(dataUrl);
        // 새 이미지 로드시 팬 초기화
        setPan({ x: 0, y: 0 }); 
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
    const displayedW = natW * scale;
    const displayedH = natH * scale;
    const offsetX = (displayedW - containerW) / 2;
    const offsetY = (displayedH - containerH) / 2;

    return { containerW, containerH, scale, displayedW, displayedH, offsetX, offsetY };
  }, [naturalSize]);

  // 이미지를 드래그하여 위치를 바꿈 
  const onPointerDown = useCallback((clientX: number, clientY: number) => {
    if (!selectedImage) return;
    dragStartRef.current = { x: clientX, y: clientY, panX: pan.x, panY: pan.y };
  }, [selectedImage, pan]);

  // 드래그를 어디서 시작했는지, 이미지가 어디에 있었는지를 저장함
  const onPointerMove = useCallback((clientX: number, clientY: number) => {
    if (!dragStartRef.current) return;
    const L = getLayout();
    if (!L) return;

    const dx = clientX - dragStartRef.current.x;
    const dy = clientY - dragStartRef.current.y;

    const nextX = Math.max(-L.offsetX, Math.min(L.offsetX, dragStartRef.current.panX + dx));
    const nextY = Math.max(-L.offsetY, Math.min(L.offsetY, dragStartRef.current.panY + dy));
    setPan({ x: nextX, y: nextY });
  }, [getLayout]);

  // 허용 범위 안에서 이미지 위치 업데이트함 
  const onPointerUp = useCallback(() => {
    dragStartRef.current = null;
  }, []);

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
    const t = e.touches[0];
    onPointerDown(t.clientX, t.clientY);
  }, [onPointerDown]);
  // 손가락으로 움직일 경우 호출
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    onPointerMove(t.clientX, t.clientY);
  }, [onPointerMove]);
  // 손가락을 뗄 때 호출
  const handleTouchEnd = useCallback(() => onPointerUp(), [onPointerUp]);

  // 중앙 128px x 128px 가이드라인 영역만 잘라서 돌려줌 (크롭 기능)
  const cropToGuide = useCallback(async (): Promise<string | null> => {
    // 이미지가 없거나, 돔 참조가 비었거나, 레이아웃 계산 실패면 걍 null반환함 
    const L = getLayout();
    if (!selectedImage || !containerRef.current || !imgRef.current || !naturalSize || !L) return null;

    // 레이아웃 값을 꺼냄
    const { containerW, containerH, scale, offsetX, offsetY } = L;

    // 컨테이너 정중앙에 가이드라인 선을 두고 싶기 때문에 시작점을 구함 
    const guideLeft = (containerW - CROP_SIZE) / 2;
    const guideTop  = (containerH - CROP_SIZE) / 2;

    // 컨테이너 기준 가이드라인 사각형의 위치를 원본 이미지 기준으로 바꿈 
    const srcX = (guideLeft + offsetX - pan.x) / scale;
    const srcY = (guideTop  + offsetY - pan.y) / scale;
    const srcSize = CROP_SIZE / scale;

    // 캔버스에 크롭 영역 그려서 데이터 URL 생성 
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
      const role = (child.props as any)['data-role'] as 'retake' | 'confirm' | undefined;

      // 역할이 retake라면, 내부 상태를 싹 초기화하고 파일 선택창을 다시 띄움 (camera모드라면 카메라 앱이 열리도록 함)
      if (role === 'retake') {
        return React.cloneElement(child as React.ReactElement<{ onClick?: (e: any) => void }>, {
          ...(child.props || {}),
          onClick: (e: any) => {
            (child.props as any)?.onClick?.(e);
            setSelectedImage(null);
            setNaturalSize(null);
            setPan({ x: 0, y: 0 });
            fileInputRef.current?.click();
          },
        });
      }

      // 역할이 confirm이라면 현재 화면 기준으로 크롭된 이미지 데이터 url을 onCrop으로 콜백함 
      if (role === 'confirm') {
        return React.cloneElement(child as React.ReactElement<{ onClick?: (e: any) => void }>, {
          ...(child.props || {}),
          onClick: async (e: any) => {
            (child.props as any)?.onClick?.(e);
            const result = await cropToGuide();
            onCrop?.(result || null);
          },
        });
      }

      return child;
    });

  const interactive = !selectedImage; // 업로드 전 = 상호작용 모드

  return (
    <div css={wrapper}>
      <div css={modalWrapper}>
        <div css={contentWrapper}>
          <h3 css={title}>의약품 촬영 가이드</h3>

          {/* 이미지 영역 */}
          <div
            // 크기 및 좌표를 재기 위해 돔을 참조함 
            ref={containerRef}
            // 이미지가 선택되어 있다면 커서를 기본으로 바꿔 업로드가 열리지 않도록 유도함 
            css={[imageArea, selectedImage && noPointerCursor]}
            onClick={handleContainerClick}
            // 업로드 전에만 활성, 업로드 후에는 비활성화함 
            aria-label={interactive ? (source === 'camera' ? '카메라로 촬영' : '앨범에서 이미지 선택') : undefined}
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : -1}

            // 이미지가 있을 때만 이미지 이동을 위한 드래그 바인딩
            onMouseDown={selectedImage ? handleMouseDown : undefined}
            onMouseMove={selectedImage ? handleMouseMove : undefined}
            onMouseUp={selectedImage ? handleMouseUp : undefined}
            onMouseLeave={selectedImage ? handleMouseUp : undefined}
            onTouchStart={selectedImage ? handleTouchStart : undefined}
            onTouchMove={selectedImage ? handleTouchMove : undefined}
            onTouchEnd={selectedImage ? handleTouchEnd : undefined}
          >
            {selectedImage ? (
              <>
                {/* 즉시 실행 함수로 이미지 배치를 계산함 */}
                {(() => {
                  const L = getLayout();
                  const left = L ? -L.offsetX + pan.x : 0;
                  const top  = L ? -L.offsetY + pan.y : 0;
                  const w    = L ? L.displayedW : '100%';
                  const h    = L ? L.displayedH : '100%';
                  return (
                    <img
                      ref={imgRef}
                      src={selectedImage}
                      alt="업로드된 이미지"
                      css={imageAbs}
                      style={{ left, top, width: w as number | string, height: h as number | string }}
                      onLoad={(e) => {
                        const target = e.currentTarget;
                        setNaturalSize({ w: target.naturalWidth, h: target.naturalHeight });
                      }}
                      draggable={false}
                    />
                  );
                })()}
                {/* 사진 크롭 가이드라인 */}
                <div css={cropGuideBox(CROP_SIZE)}>
                  <span css={corner('tl', 26, 3, '#00c853', 10)} />
                  <span css={corner('tr', 26, 3, '#00c853', 10)} />
                  <span css={corner('bl', 26, 3, '#00c853', 10)} />
                  <span css={corner('br', 26, 3, '#00c853', 10)} />
                </div>
                {/* 바깥 마스킹 */}
                <div css={cropMask(CROP_SIZE)} />
              </>
            ) : (
              <div css={placeholderText}>
                {source === 'camera' ? '탭하여 카메라로 촬영하세요' : '탭하여 이미지 업로드하세요'}
              </div>
            )}
          </div>

          {/* 파일 선택 / 카메라 촬영을 담당하는 입력창(숨겨져있음) */}
          {/* ref로 클릭을 대신 눌러 동작시킴 */}
          <input
            // 바깥 컨테이너를 탭했을 때 파일 선택창을 open (또는 카메라 촬영)
            ref={fileInputRef}
            type="file"
            // 선택한 파일 형식 (image/* -> 이미지 파일만 선택 가능함)
            accept={accept}
            // capture: 'environment' -> 후면 카메라를 우선 
            {...(source === 'camera' ? { capture: 'environment' as any } : {})}
            onChange={handleFileInputChange}
            // 화면에서는 숨김 
            style={{ display: 'none' }}
          />

          {/* 안내 텍스트 */}
          <div css={guideText}>
            {source === 'camera' ? '탭하여 카메라로 촬영하세요' : '탭하여 이미지 업로드하세요'}
          </div>
        </div>

        {/* 버튼 영역 - children에 역할별 클릭 이벤트 주입 */}
        <div css={btnWrapper}>
          {injectButtons(children)}
        </div>
      </div>
    </div>
  );
});

const wrapper = css`
  width: 100%;
  height: 100%;
  padding: 0 2.81rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const modalWrapper = css`
  position: relative;
  border-radius: 1.25rem;
  padding: 1.75rem 1rem 1rem 1rem;
  background: var(--BG-BG-3, #fff);
  width: 100%;
  height: 100%;
  box-sizing: content-box;
  align-items: flex-start;
`;

const contentWrapper = css`
  padding: 0 3.22rem;
  width: 100%;
  height: 100%;
`;

const title = css`
  font-family: var(--Font-Family-font-family, "NanumSquare Neo");
  font-size: 0.875rem;
  color: var(--Text-Text-1, #202020);
  text-align: center;
  font-weight: 600;
  line-height: 1.125rem;
  letter-spacing: -0.01rem;
  margin-bottom: 1rem;
  margin-top: -0.5rem;
`;

const imageArea = css`
  width: 100%;
  aspect-ratio: 1 / 1;
  margin: 0 auto 1rem;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  /* 이미지 이동 드래그 시 페이지 스크롤 방지함 */
  touch-action: none;
  cursor: pointer;
`;

// 드래그용 절대 배치 이미지
const imageAbs = css`
  position: absolute;
  will-change: left, top;
  user-select: none;
  // 드래그 이벤트는 컨테이너에 바인딩
  pointer-events: none; 
`;

const placeholderText = css`
  text-align: center;
  color: #666;
  font-size: 0.875rem;
`;

const guideText = css`
  color: var(--Text-Text-1, #202020);
  text-align: center;
  font-family: "NanumSquare Neo";
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1rem; 
  letter-spacing: -0.006rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const btnWrapper = css`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1.5rem;
`;

// 크롭 가이드라인 css
const cropGuideBox = (size: number) => css`
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${size}px;
  height: ${size}px;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 2;
`;

type CornerPos = 'tl' | 'tr' | 'bl' | 'br';
const corner = (
  pos: CornerPos,
  len = 24,           // 코너 선 길이
  stroke = 3,         // 선 두께
  color = '#00c853',  // 선 색
  radius = 8          // 코너 라운드
) => css`
  position: absolute;
  width: ${len}px;
  height: ${len}px;
  border: ${stroke}px solid ${color};
  ${pos === 'tl' ? `
    left: 0; top: 0;
    border-right: none; border-bottom: none;
    border-top-left-radius: ${radius}px;
  ` : ''}
  ${pos === 'tr' ? `
    right: 0; top: 0;
    border-left: none; border-bottom: none;
    border-top-right-radius: ${radius}px;
  ` : ''}
  ${pos === 'bl' ? `
    left: 0; bottom: 0;
    border-right: none; border-top: none;
    border-bottom-left-radius: ${radius}px;
  ` : ''}
  ${pos === 'br' ? `
    right: 0; bottom: 0;
    border-left: none; border-top: none;
    border-bottom-right-radius: ${radius}px;
  ` : ''}
`;

const cropMask = (size: number) => css`
  position: absolute;
  inset: 0;
  /* 중앙 사각형만 투명하고 나머지는 반투명 검정 마스크 */
  background:
    radial-gradient(circle at center, transparent ${size/2}px, rgba(0,0,0,0.35) ${size/2 + 0.5}px);
  pointer-events: none;
  z-index: 1;
`;

const noPointerCursor = css`
  cursor: default;
`;
