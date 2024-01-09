import { useDataStore } from '@/lib/store'
import Parser from 'papaparse'
import { useMemo, useEffect, useState } from 'react'

export const useTrackmanData = (pitcher: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<TrackmanData[] | null>(null)
  const [pitchType, setPitchType] = useDataStore((state) => [state.pitchType, state.setPitchType])

  // Reduce the data to a list of unique pitchers
  const uniquePitchers = useMemo(() => {
    return (
      data?.reduce((acc, cur) => {
        if (!acc.find((ele) => ele.value.toLowerCase() === cur.Pitcher.toLowerCase())) {
          acc.push({ value: cur.Pitcher.toLowerCase(), label: cur.Pitcher })
        }
        return acc
      }, [] as { value: string; label: string }[]) ?? []
    )
  }, [data])

  // Filter the data to only the selected pitcher
  const pitcherData = useMemo(() => {
    const filteredData = data?.filter((ele) => ele.Pitcher.toLowerCase() === pitcher.toLowerCase())
    const uniquePitchTypes = Array.from(new Set(filteredData?.map((data) => data.TaggedPitchType)))

    return { filteredData, uniquePitchTypes }
  }, [data, pitcher])

  useEffect(() => {
    if (!pitchType) {
      setPitchType(pitcherData.uniquePitchTypes[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pitchType])

  // Set the pitch type to the first unique pitch type when the pitcher changes
  useEffect(() => {
    if (pitcher) {
      setPitchType(pitcherData.uniquePitchTypes[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pitcher])

  // Fetch the data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      // FIXME: If coach approves dashboard, adapt fetch request to use internal API
      const response = await fetch('/src/assets/2021_Phillies_Questionnaire.csv')
      const reader = response.body?.getReader()
      const result = await reader?.read() // raw stream
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result?.value) // convert stream to string
      Parser.parse(csv, {
        complete: (results) => {
          const data = results.data as TrackmanData[]
          setData(data)
        },
        header: true
      })

      setIsLoading(false)
    }
    fetchData()
  }, [])

  return {
    data,
    uniquePitchers,
    pitcherData: pitcherData.filteredData ?? [],
    uniquePitchTypes: pitcherData.uniquePitchTypes ?? [],
    isLoading
  }
}
