import Consul from "consul"

const consul = new Consul({
  host: process.env.CONSUL_HOST || "consul_service",
})

export async function getConfig(serviceName: string) {
  const result = await consul.kv.get(`config/${serviceName}`)
  if (!result || !result.Value) {
    throw new Error(`No config found for ${serviceName}`)
  }
  return JSON.parse(result.Value as string)
}
