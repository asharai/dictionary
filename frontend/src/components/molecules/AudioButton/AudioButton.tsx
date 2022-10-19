import { FC, useState } from 'react';
import ReactHowler from 'react-howler';
import styles from './AudioButton.module.css';

interface IAudioButtonProps {
  audioSrc: string;
  text: string;
}

export const AudioButton: FC<IAudioButtonProps> = ({ audioSrc, text }) => {
  const [isPlaying, setPlaying] = useState(false);

  return (
    <>
      <button className={styles.button} onClick={() => setPlaying(true)}>
        <div className={styles.audioContainer}>
          <ReactHowler
            src={audioSrc}
            playing={isPlaying}
            onEnd={() => {
              setPlaying(false);
            }}
          />
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.play}>
            <div className={styles.triangle}></div>
          </div>
          <div className={styles.text}>{text}</div>
        </div>
      </button>
    </>
  );
};

export default AudioButton;
