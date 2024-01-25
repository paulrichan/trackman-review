import { create } from 'zustand'

interface IDataStore {
  file: File | null
  setFile: (file: File | null) => void

  pitcher: string
  setPitcher: (pitcher: string) => void

  pitchType: string
  setPitchType: (pitcher: string) => void

  decidedPitchType: 'TaggedPitchType' | 'AutoPitchType'
  setDecidedPitchType: (decidedPitchType: 'TaggedPitchType' | 'AutoPitchType') => void

  screen: string
  setScreen: (screen: string) => void
}

export const useDataStore = create<IDataStore>((set) => ({
  file: null,
  setFile: (file: File | null) => set({ file }),

  screen: 'visuals',
  setScreen: (screen: string) => set({ screen }),

  decidedPitchType: 'TaggedPitchType',
  setDecidedPitchType: (decidedPitchType: 'TaggedPitchType' | 'AutoPitchType') => set({ decidedPitchType }),

  pitcher: '',
  setPitcher: (pitcher: string) => set({ pitcher }),

  pitchType: '',
  setPitchType: (pitchType: string) => set({ pitchType })
}))
