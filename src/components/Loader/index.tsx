import { FC } from 'react'
import styles from './style.module.css'

const Loader: FC = () => (
  <div className={styles.container}>
    <span className={styles.loader} />
  </div>
)

export default Loader
