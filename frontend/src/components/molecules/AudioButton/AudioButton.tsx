import { FC, useMemo, useRef } from 'react';

import styles from './AudioButton.module.css';

interface IAudioButtonProps {
  audioSrc: string;
  text: string;
}

export const AudioButton: FC<IAudioButtonProps> = ({ audioSrc, text }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  console.log('changes', audioSrc);

  const audioComponent = useMemo(() => {
    return (
      <audio
        style={{
          marginTop: 20,
        }}
        ref={audioRef}
      >
        <source src={audioSrc} />
      </audio>
    );
  }, [audioSrc]);

  return (
    <>
      {audioComponent}
      <button
        className={styles.button}
        onClick={() => audioRef.current?.play()}
      >
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
