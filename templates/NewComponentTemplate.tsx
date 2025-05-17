import { useEffect } from 'react'

export interface NewComponentTemplateProps {
  exampleProp: string
}

export default function NewComponentTemplate({ exampleProp }: NewComponentTemplateProps) {
  useEffect(() => {
    // TODO: effect logic
  }, [])

  return (
    <div>
      {exampleProp}
    </div>
  )
}
