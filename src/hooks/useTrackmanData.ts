import { useDataStore } from '@/lib/store'
import { useMemo, useEffect, useState } from 'react'
import Parser from 'papaparse'

export const useTrackmanData = (pitcher: string) => {
  const { file } = useDataStore((state) => ({ file: state.file }))
  const [data, setParsedData] = useState<TrackmanData[] | null>(null)
  const [pitchType, setPitchType] = useDataStore((state) => [state.pitchType, state.setPitchType])

  useEffect(() => {
    const parseData = async () => {
      if (file) {
        const csv = await file.text()

        Parser.parse(csv, {
          complete: (results) => {
            const data = results.data as TrackmanData[]
            setParsedData(data)
          },
          header: true
        })
      }
    }

    if (file !== null) parseData()
  }, [file])

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

  return {
    data,
    uniquePitchers,
    pitcherData: pitcherData.filteredData ?? [],
    uniquePitchTypes: pitcherData.uniquePitchTypes ?? [],
    file
  }
}
