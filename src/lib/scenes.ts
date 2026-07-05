export type Scene = {
  id: string;
  prompt: string;
  frameFolder: string;
  frameCount: number;
  label: string;
};

export const scenes: Scene[] = [
  {
    id: "lighthouse",
    prompt: "a lighthouse on a rocky coast at dawn, film grain",
    frameFolder: "/frames/lighthouse",
    frameCount: 144,
    label: "lighthouse, dawn",
  },
];