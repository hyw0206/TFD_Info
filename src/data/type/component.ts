export interface Component {
  external_component_id: string
  external_component_name: string
  image_url: string
  external_component_equipment_type: string
  external_component_tier: string
  base_stat: BaseStat[]
  set_option_detail: SetOptionDetail[]
}

export interface BaseStat {
  level: number
  stat_id: string
  stat_value: number
}

export interface SetOptionDetail {
  set_option: string
  set_count: number
  set_option_effect: string
}
