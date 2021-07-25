import React, { forwardRef } from 'react';
import Button from '@material-ui/core/Button';
import styles from './ModalComponent.module.scss'
// import './ModalComponent.scss'
import { useTransition, animated, config, useSpring } from 'react-spring';

const ModalComponent = forwardRef(({ modalAnime, page }, ref) => {
  console.log(modalAnime, page)
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config:config.wobbly,
  })
  return (
    <animated.div style={style} className={styles.modalAnime}>
      <div><span className={styles.label}>Title :</span> {modalAnime.title}</div>
      <div><span className={styles.label}>Rating :</span> {modalAnime.score}</div>
      <div><span className={styles.label}>Genre : </span>{modalAnime.genres.map(genre => <span key={genre.mal_id}>{genre.name} </span>)}</div>
      <div><span className={styles.label}>Producer : </span>{modalAnime.producers.map(producer => <span key={producer.mal_id}>{producer.name}</span>)}</div>
      {modalAnime.licensors.length !== 0 && <div><span className={styles.label}>Licensor : </span>{modalAnime.licensors.map((licensor, i) => <span key={i}>{licensor}</span>)}</div>}
      <div><span className={styles.label}>Synopsis : </span>{modalAnime.synopsis}</div>
      <div className={styles.buttonWrapper}><Button className={styles.button} variant="contained" color="primary" href={modalAnime.url} target="_blank">MAL SITE</Button></div>
    </animated.div>
  )
})

export default ModalComponent;