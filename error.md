
# react-native-video
  seen method
go to path node_modules then react-native-video then
'android/src/main/java/com/brentvatne/react/ReactVideoView.java'
on the line 640: and change this

- super.seekTo(msec);
+ super.mMediaPlayer.seekTo(msec, MediaPlayer.SEEK_CLOSEST);