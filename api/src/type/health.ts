export type HealthResponse = {
  status: "UP" | "DOWN";
  services: string;
  version: string;
  timestamp: string;
  uptime: number;
  components: {
    [key: string]: {
      status: "UP" | "DOWN";
    };
  };
};
