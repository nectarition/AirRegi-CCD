export interface Advertisements {
  order: number
  url: string
  displaySeconds: number
}

export interface Settings {
  customerDisplayUrl: string
  acceptanceUrl: string
  advertisements: Advertisements[]
}
