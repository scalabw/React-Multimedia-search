import MultimediaSearchResults from './content/MultimediaSearchResults'
import Header from './header/Header'

export enum MultimediaType {
  movies = 'movies',
  series = 'series',
}

interface MultimediaSearchProps {
  multimediaType: MultimediaType
}

const MultimediaSearch = ({ multimediaType }: MultimediaSearchProps) => {
  return (
    <>
      <Header multimediaType={multimediaType} />
      <MultimediaSearchResults multimediaType={multimediaType} />
    </>
  )
}

export default MultimediaSearch
