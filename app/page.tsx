'use client'

import Counter from "./components/component"
import styles from './page.module.css'

export default function ClientComponent() {
  return <div>
    <h1 className={styles.hello}>Hello</h1>
    <Counter/>
  </div>
}
