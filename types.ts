export type FormActionReturn<E = unknown> = {
  success: boolean;
  error?: E | undefined;
};

const MAINNET = "mainnet";
const DEVNET = "devnet";
export const Clusters = [MAINNET, DEVNET];
export type Cluster = (typeof Clusters)[number];
