import { create } from "zustand";

interface Background {
  id: string;
  thumbnailPath: `url(${string})`;
  urlPath: string;
}

interface BackgroundStore {
  backgrounds: Background[];
  checkedId: string | null; 
  appliedId: string | null; 
  click: (id: string) => void;
  apply: () => void;
  isChecked: (id: string) => boolean;
  isApplied: (id: string) => boolean;
}

export const useBackgroundStore = create<BackgroundStore>()((set, get) => {
  const CottonCandyUrl = "https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.15&cAzimuthAngle=180&cDistance=2.6&cPolarAngle=120&cameraZoom=1&color1=%23ebedff&color2=%23f3f2f8&color3=%23dbf8ff&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=1.8&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=-90&shader=defaults&type=plane&uDensity=1&uFrequency=5.5&uSpeed=0.15&uStrength=3&uTime=0.2&wireframe=false";
  const MintUrl = "https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=170&cDistance=4&cPolarAngle=70&cameraZoom=1&color1=%2394ffd1&color2=%236bf5ff&color3=%23ffffff&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=0.9&positionZ=-0.3&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=45&rotationY=0&rotationZ=0&shader=defaults&type=plane&uAmplitude=0&uDensity=1.2&uFrequency=0&uSpeed=0.05&uStrength=3.4&uTime=0&wireframe=false";
  const NightyNightUrl = "https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.5&cAzimuthAngle=180&cDistance=2.2&cPolarAngle=80&cameraZoom=9.1&color1=%233d2a80&color2=%23b4bdca&color3=%23212121&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=0&positionZ=0&range=enabled&rangeEnd=35&rangeStart=0&reflection=0.1&rotationX=50&rotationY=0&rotationZ=-60&shader=defaults&type=plane&uAmplitude=0&uDensity=1&uFrequency=0&uSpeed=0.25&uStrength=0.8&uTime=8&wireframe=false&zoomOut=false";
  const SunsetUrl = "https://www.shadergradient.co/customize?animate=on&axesHelper=on&bgColor1=%23000000&bgColor2=%23000000&brightness=1.5&cAzimuthAngle=60&cDistance=7.1&cPolarAngle=90&cameraZoom=25&color1=%23ff7a33&color2=%2333a0ff&color3=%23ffc53d&destination=onCanvas&embedMode=off&envPreset=dawn&format=gif&fov=50&frameRate=10&grain=off&http%3A%2F%2Flocalhost%3A3002%2Fcustomize%3Fanimate=on&lightType=3d&pixelDensity=1&positionX=0&positionY=-0.15&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=0&shader=defaults&toggleAxis=false&type=sphere&uAmplitude=2&uDensity=1.1&uFrequency=5.5&uSpeed=0.05&uStrength=0.4&uTime=0&wireframe=false&zoomOut=false";
  const ViolaOrientalsUrl = "https://www.shadergradient.co/customize?animate=on&axesHelper=on&bgColor1=%23000000&bgColor2=%23000000&brightness=1.1&cAzimuthAngle=0&cDistance=6.6&cPolarAngle=140&cameraZoom=25&color1=%23ffffff&color2=%23ffa333&color3=%238c00ff&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=20&frameRate=10&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=0&shader=defaults&type=sphere&uAmplitude=1.4&uDensity=1.1&uFrequency=5.5&uSpeed=0.05&uStrength=1&uTime=0&wireframe=false&zoomOut=false";
  
  const backgrounds: Background[] = [
    { id: "CottonCandy", thumbnailPath: "url(/images/background/CottonCandy.svg)", urlPath: CottonCandyUrl },
    { id: "Mint", thumbnailPath: "url(/images/background/Mint.svg)", urlPath: MintUrl },
    { id: "NightyNight", thumbnailPath: "url(/images/background/NightyNight.svg)", urlPath: NightyNightUrl },
    { id: "Sunset", thumbnailPath: "url(/images/background/Sunset.svg)", urlPath: SunsetUrl },
    { id: "ViolaOrientals", thumbnailPath: "url(/images/background/ViolaOrientals.svg)", urlPath: ViolaOrientalsUrl },
  ];

  const defaultAppliedId = "CottonCandy";

  return {
    backgrounds,
    checkedId: null,
    appliedId: defaultAppliedId,

    click: (id) => set({ checkedId: id }),

    apply: () => {
      const { checkedId } = get();
      if (checkedId) {
        set({ appliedId: checkedId });
      }
    },

    isChecked: (id) => get().checkedId === id,
    isApplied: (id) => get().appliedId === id,
  };
});
