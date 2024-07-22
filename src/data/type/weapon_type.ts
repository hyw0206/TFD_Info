export interface Weapon {
  weapon_id: string;
  weapon_name: string;
  image_url: string;
  weapon_type: string;
  weapon_tier: string;
  weapon_rounds_type: string;
  base_stat: Basestat[];
  firearm_atk: Firearmatk[];
  weapon_perk_ability_name: string | null;
  weapon_perk_ability_description: string | null;
  weapon_perk_ability_image_url: string | null;
}
interface Firearmatk {
  level: number;
  firearm: Firearm[];
}
interface Firearm {
  firearm_atk_type: string;
  firearm_atk_value: number;
}
export interface Basestat {
  stat_id: string;
  stat_value: number | number | string;
}