import { CompendiumItem, ItemType, Manufacturer } from '@/class'
import { store } from '@/store'
import { ICompendiumItemData, ICounterData, ITagCompendiumData } from '@/interface'
import { IActionData } from '../Action'
import { IBonusData } from '../Bonus'
import { ISynergyData } from '../Synergy'
import { IDeployableData } from '../Deployable'

interface ICoreBonusData extends ICompendiumItemData {
  source: string
  effect: string
  mounted_effect?: string
  actions?: IActionData[]
  bonuses?: IBonusData[]
  synergies?: ISynergyData[]
  deployables?: IDeployableData[]
  integrated?: string[]
  counters?: ICounterData[]
}

class CoreBonus extends CompendiumItem {
  public readonly Source: string
  public readonly Effect: string
  public readonly MountedEffect: string

  public constructor(data?: ICoreBonusData, packTags?: ITagCompendiumData[], packName?: string) {
    super(data, packTags, packName)
    this.Source = data.source
    this.Effect = data.effect
    this.MountedEffect = data.mounted_effect || ''
    this.ItemType = ItemType.CoreBonus
  }

  public get Manufacturer(): Manufacturer {
    return store.getters.referenceByID('Manufacturers', this.Source)
  }

  public get IsMountable(): boolean {
    return !!this.MountedEffect
  }

  public static Deserialize(id: string): CoreBonus {
    return store.getters.referenceByID('CoreBonuses', id)
  }
}

export { CoreBonus, ICoreBonusData }
