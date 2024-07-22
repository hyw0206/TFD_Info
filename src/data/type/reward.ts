export interface RewardData {
  map_id: string;
  map_name: string;
  battle_zone: Battlezone[];
}
interface Battlezone {
  battle_zone_id: string;
  battle_zone_name: string;
  reward: Reward[];
}
interface Reward {
  rotation: number;
  reward_type: string;
  reactor_element_type?: string;
  weapon_rounds_type?: string;
  arche_type?: string;
}
