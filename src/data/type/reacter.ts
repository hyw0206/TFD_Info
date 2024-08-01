export interface Module {
  reactor_id: string
  reactor_name: string
  image_url: string
  reactor_tier: string
  reactor_skill_power: ReactorSkillPower[]
  optimized_condition_type?: string
}

export interface ReactorSkillPower {
  level: number
  skill_atk_power: number
  sub_skill_atk_power: number
  enchant_effect: EnchantEffect[]
  skill_power_coefficient: SkillPowerCoefficient[]
}

export interface EnchantEffect {
  enchant_level: number
  stat_type: string
  value: number
}

export interface SkillPowerCoefficient {
  coefficient_stat_id: string
  coefficient_stat_value: number
}
