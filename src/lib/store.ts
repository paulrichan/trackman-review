import { create } from 'zustand'

interface IDataStore {
  pitcher: string
  setPitcher: (pitcher: string) => void
  pitchType: string
  setPitchType: (pitcher: string) => void

  screen: string
  setScreen: (screen: string) => void
}

export const useDataStore = create<IDataStore>((set) => ({
  screen: 'visuals',
  setScreen: (screen: string) => set({ screen }),

  pitcher: '',
  setPitcher: (pitcher: string) => set({ pitcher }),

  pitchType: '',
  setPitchType: (pitchType: string) => set({ pitchType })
}))
