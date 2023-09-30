import java.io.*;

import javax.sound.sampled.*;

public class BackgroundAudio {
    private static Clip clip;

    public static void play() {
        try {
            if(clip == null) {
                clip = AudioSystem.getClip();
                clip.open(AudioSystem.getAudioInputStream(new File("BeastModeActivated.wav")));
            }
            //clip.start();
            clip.setLoopPoints(0, -1);
            clip.loop(Clip.LOOP_CONTINUOUSLY);
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    public static void resume() {
        try {
            clip.loop(Clip.LOOP_CONTINUOUSLY);
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    public static void pause() {
        try {
            clip.stop();
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    public static void stop() {
        try {
            clip.stop();
            clip = null;
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}
