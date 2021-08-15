import React, { forwardRef } from 'react';
import Button from '@material-ui/core/Button';
import styles from './ModalComponent.module.scss'
// import './ModalComponent.scss'
import { useTransition, animated, config, useSpring } from 'react-spring';
import ReactPlayer from 'react-player/youtube'

const ModalComponent = forwardRef(({ modalAnime, page, open }, ref) => {
  console.log(modalAnime, page, open)
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.wobbly,
  })
  const handleClose = () => {
    open.setOpen(false);
  }
  return (
    <animated.div style={style} className={styles.modalAnime}>
      <div><span className={styles.label}>Title :</span> {modalAnime.title}</div>
      <div><span className={styles.label}>Rating :</span> {modalAnime.score}</div>
      <div><span className={styles.label}>Genre : </span>{modalAnime.genres.map(genre => <span key={genre.mal_id}>{genre.name} </span>)}</div>
      <div><span className={styles.label}>Producer : </span>{modalAnime.producers.map(producer => <span key={producer.mal_id}>{producer.name}</span>)}</div>
      {modalAnime.licensors.length !== 0 &&
        <div><span className={styles.label}>Licensor : </span>{modalAnime.licensors.map(licensor => <span key={licensor.mal_id}>{licensor.name}</span>)}</div>
      }
      <div><span className={styles.label}>Synopsis : </span>{modalAnime.synopsis}</div>
      <ReactPlayer controls={true} width={'100%'} url={modalAnime.trailer.embed_url} />
      <div className={styles.buttonWrapper}>
        <Button className={styles.button} variant="contained" color="primary" href={modalAnime.url} target="_blank">MAL SITE</Button>
        <Button className={styles.button} variant="contained" color="primary" onClick={handleClose}>CLOSE</Button>
      </div>
    </animated.div>
  )
})

export default ModalComponent;