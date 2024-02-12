import { FC } from 'react'
import { useTechnology } from '../../hooks/useTechnology.ts'
import styles from './styles.module.css'
import Loader from '../../components/Loader'

type TechnologyProps = {}

const Technology: FC<TechnologyProps> = () => {
  const { isLoading } = useTechnology()

  if (isLoading) return <Loader />
  return <div className={styles.container}>
    technology
  </div>
}

export default Technology