export interface Advertisements {
  order: number
  url: string
  displaySeconds: number
}

export interface Settings {
  customerDisplayUrl: string
  advertisements: Advertisements[]
}
