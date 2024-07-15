export interface RootObject {
  descendant_id: string;
  descendant_name: string;
  descendant_image_url: string;
  descendant_stat: Descendantstat[];
  descendant_skill: Descendantskill[];
}
interface Descendantskill {
  skill_type: string;
  skill_name: string;
  element_type: string;
  arche_type?: string | string;
  skill_image_url: string;
  skill_description: string;
}
interface Descendantstat {
  level: number;
  stat_detail: Statdetail[];
}
interface Statdetail {
  stat_type: string;
  stat_value: number;
}
