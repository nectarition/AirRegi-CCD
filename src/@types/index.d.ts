export interface Advertisements {
  order: number
  url: string
  displaySeconds: number
}

export interface Settings {
  heightPercent: number
  customerDisplayUrl: string
  acceptanceUrl: string
  advertisements: Advertisements[]
}
