import { Eureka } from "eureka-js-client";
import { getConfig } from "./getConfig";

(async () => {
  const config = await getConfig("gateway");
  const client = new Eureka({
    instance: {
      app: "gateway",
      hostName: "gateway",
      ipAddr: "gateway",
      port: {
        $: config.port,
        "@enabled": true,
      },
      vipAddress: "books",
      dataCenterInfo: {
        "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
        name: "MyOwn",
      },
    },
    eureka: {
      host: process.env.EUREKA_SERVER || "eureka_service",
      port: 8761,
      servicePath: "/eureka/apps/",
    },
  });

  client.start((err) => {
    if (err) console.error("Eureka registration failed:", err);
    else console.log("📍 Books service registered in Eureka");
  });
})();
