import { RestrictedNumber } from 'restricted-number';
import { IItem } from './IItem';
import { IChoice } from './IChoice';
import { ServerEventName } from './ServerEvent';
import { IProfession } from './IProfession';
import { IBuff } from './IBuff';
import { IParty } from './IParty';
import { Stat } from './Stat';
import { ICombatSkill } from './ICombatSkill';

export enum Direction {
  Southwest = 1,
  South = 2,
  Southeast = 3,
  West = 4,
  Nowhere = 5,
  East = 6,
  Northwest = 7,
  North = 8,
  Northeast = 9
}

export enum MovementType {
  Ascend = 'ascend',
  Descend = 'descend',
  Fall = 'fall',
  Teleport = 'teleport'
}

export enum Profession {
  Archer = 'Archer',
  Barbarian = 'Barbarian',
  Bard = 'Bard',
  Bitomancer = 'Bitomancer',
  Cleric = 'Cleric',
  Fighter = 'Fighter',
  Generalist = 'Generalist',
  Jester = 'Jester',
  Mage = 'Mage',
  MagicalMonster = 'MagicalMonster',
  Monster = 'Monster',
  Necromancer = 'Necromancer',
  Pirate = 'Pirate',
  Rogue = 'Rogue',
  SandwichArtist = 'SandwichArtist'
}

export interface ICharacter {
  name: string;
  level: RestrictedNumber;
  gender: string;

  init(): void;
  recalculateStats(): void;

  equip(item: IItem): void;
  unequip(item: IItem): void;
}

export interface IPlayer extends ICharacter {
  _id: string;

  userId: string;
  sessionId: string;
  authId: string;
  authType: string;
  authSyncedTo: string;

  createdAt: number;

  profession: Profession;

  xp: RestrictedNumber;

  x: number;
  y: number;
  map: string;
  loggedIn: boolean;
  ascensionLevel: number;

  eventSteps: number;

  availableGenders: string[];
  availableTitles: string[];

  $profession: any;
  $professionData: any;

  $statistics: any;
  $statisticsData: any;

  $inventory: any;
  $inventoryData: any;

  $choices: any;
  $choicesData: any;

  $achievements: any;
  $achievementsData: any;

  $personalities: any;
  $personalitiesData: any;

  $collectibles: any;
  $collectiblesData: any;

  $pets: any;
  $petsData: any;

  $premium: any;
  $premiumData: any;

  lastDir: Direction;
  divineDirection?: { x: number, y: number, steps: number };
  buffWatches: { [key in Stat]?: IBuff[] };

  $party?: IParty;

  loop(): Promise<void>;
  toSaveObject(): IPlayer;

  canLevelUp(): boolean;
  gainXP(num: number, addMyXP: boolean): number;
  resetMaxXP(): void;
  gainGold(num: number, addMyGold: boolean): number;

  alwaysTryAddToInventory(item: IItem): void;
  sellItem(item: IItem): number;

  changeProfessionWithRef(profession: string): void;
  changeProfession(profession: IProfession): void;

  doChoice(choice: IChoice, decisionIndex: number): void;

  emit(evt: ServerEventName, data: any): void;

  getDefaultChoice(str: string[]): string;
  hasPersonality(pers: string): boolean;

  hasAchievement(achievement: string): boolean;
  hasCollectible(collectible: string): boolean;
  tryFindCollectible({ name, rarity, description, storyline }): void;

  increaseStatistic(stat: string, val: number): void;

  forceUnequip(item: IItem): void;

  grantBuff(buff: IBuff, canShare: boolean): void;

  gainILP(ilp: number): void;

  setDivineDirection(x: number, y: number): void;
  setPos(x: number, y: number, map: string, region: string): void;

  changeGender(newGender: string): void;
  changeTitle(newTitle: string): void;

  tryToDoNewCharacter(): void;

  oocAction(): string;
  petOOCAction(): string;

  addBuff(buff: IBuff): void;

  injuryCount(): number;
  cureInjury(): void;
}
