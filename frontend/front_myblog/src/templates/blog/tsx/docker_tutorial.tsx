import { Container, Typography, Box, Link, Divider, List, ListItem, ListItemText } from '@mui/material';
import docker_tutorial_1 from '/images/docker/docker_tutorial_1.png';
import docker_tutorial_2 from '/images/docker/docker_tutorial_2.png'
import docker_tutorial_3 from '/images/docker/docker_tutorial_3.png'
import docker_tutorial_4 from '/images/docker/docker_tutorial_4.png'

const DockerTutorial: React.FC = () => {
  return (
    <Container>
      <Box id="toc">
        <Typography variant="h2">目次</Typography>
        <List>
          <ListItem disablePadding>
            <ListItemText primary={<Link href="#docker-what">1. Dockerとは</Link>} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary={<Link href="#mount">2. Mount</Link>} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary={<Link href="#docker-network">3. Docker Network</Link>} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary={<Link href="#docker-compose">4. Docker Compose</Link>} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary={<Link href="#summary">5. まとめ</Link>} />
          </ListItem>
        </List>
      </Box>

      <Box sx={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6, padding: 3 }}>
        <Divider />
        <Typography align="center" sx={{ marginBottom: 2 }}>
          Dockerのチュートリアルを読んで理解するのに苦労したので、これからDockerを学ぶ方々の助けになればと思い書いています。また、公式ドキュメントを読むのが一番の勉強になると考えているのでここでは概念的な話を行います。
        </Typography>

        <Typography variant="h2" id="docker-what">1. Dockerとは</Typography>

        <Typography component="p">
          Dockerを一言でまとめると<b>軽量かつ高速にOSレベルの仮想環境をコンテナ化し、その配布・管理を行うためのプラットフォーム</b>です。コンテナはアプリケーションに必要なものだけをまとめて隔離できるため、効率的な開発や実行が可能になります。また,OSや環境変数の違いを吸収してくれるため複数人での開発においてホストOSが違うなど環境特有のエラーを防ぐことができる。
        </Typography>

        <Typography component="p">
          Dockerでは仮想環境のことを<strong>コンテナ</strong>と呼び、OSのカーネルを共有しながらプロセスを隔離する技術です。このコンテナは<strong>Docker Image</strong>を元に作成されます.
        </Typography>


        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <img src={docker_tutorial_1} alt="表示できません" style={{ maxWidth: '100%' }} />
        </Box>

        <Typography>
          <b>Docker用語</b>
        </Typography>

        <Typography component="p">
          コンテナ=OSレベルの仮想環境
          <br />
          Docker Image=コンテナの元になるもの
          <br /><br />
        </Typography>
        <Typography component="p">
          Dockerサービスの一つである<b>Docker Hub</b>には様々なDocker Image(イメージ)が置かれており<b>Docker pull</b>コマンドでイメージのダウンロードを行うことができる。また、<b>Dockerfile & docker buildコマンド</b>を使用してオリジナルイメージを作成することができる.
        </Typography>

        <Typography component="p">
          オリジナルイメージを使用するタイミングとして、Docker Hubにあるイメージをもとに追加の設定を行いたい場合やDocker Hubにあるイメージが古い時、**独自のライブラリや設定を組み込みたい場合**などがあげられる。
          <Link href="https://hub.docker.com/_/django" target="_blank" rel="noopener">
            Docker Hub
          </Link>にあるDjangoのイメージは、pythonのversionが3.4である点が例として挙げられる。
          <br />
          <br />
        </Typography>


        <Typography variant="h2" id="mount">2. Mount</Typography>

        <Typography component="p">
          デフォルトの設定では、コンテナはネットワーク的に隔離されており、他のコンテナやホストOSへのアクセスは制限されています。また、コンテナは本質的にステートレスであるため、コンテナを削除すると、コンテナ内で行った変更（ファイルの作成や編集など）はすべて失われます。これらの課題を解決し、コンテナ間の連携やデータの永続化を実現するのが、<strong>Docker network</strong> や <strong>ボリューム（またはバインドマウント）</strong>といった機能です。
          <br />
          <br />
        </Typography>

        <Typography component="p">
          Dockerのマウントには主に3種類ありますが、ここでは2つ紹介します.<strong>バインドマウント(bind mount)</strong>と<strong>ボリュームマウント(volume mount)</strong>です。これらは，主にコンテナ内の変更を維持するために存在しますが使用用途に違いがあります.
          <br />
          <br />
        </Typography>

        <Typography component="p">
          <strong>ボリュームマウント(Docker Volume)</strong>はコンテナと**Dockerボリュームと呼ばれるDockerが管理する専用のストレージ領域**に対してマウントされます。特徴として、コンテナ削除後もデータを永続化することができ、コンテナ間でのデータ共有も可能です。
          <br />
          <br />
        </Typography>


        <Typography component="p">
          <b>バインドマウント</b>は、ホストOS上の特定のディレクトリ(自分で設定)とコンテナをマウントします。これは、ホストOSの特定のディレクトリとコンテナを直接リンクするため、ホスト側での変更が即座にコンテナに反映されます。
          <br />
          <br />
        </Typography>

        <Typography component="p">
          整理すると、コンテナ削除後すべての変更点が削除されるがファイルはバインドマウント、データはボリュームマウントにより変更点が保存されている。次のコンテナ起動時にバインドマウント、ボリュームマウントによりファイルやデータがコンテナに読み込まれ、あたかも続きから編集しているかのように作業を再開できます。
          <br />
          <br />
        </Typography>

        <Typography>ここまでの概念図</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <img src={docker_tutorial_2} alt="表示できません" style={{ maxWidth: '100%' }} />
        </Box>

        <Typography component="p">
          <strong>Docker用語</strong><br />
          バインドマウント    =  ホストosとコンテナをマウントする<br />
          ボリュームマウント  =  コンテナとdockerをマウントする<br />
          <br />
          <br />
        </Typography>

        <Typography variant="h2" id="docker-network">3. Docker Network</Typography>

        <Typography component="p">
          複数のコンテナを相互に通信させるために、Docker Networkを使用する。例えば、フロント用のコンテナ、バックエンド用のコンテナ、データベース用のコンテナが相互に通信させたいと思ったときは、Docker Networkを使用する。
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <img src={docker_tutorial_3} alt="表示できません" style={{ maxWidth: '100%' }} />
        </Box>

        <Typography variant="h2" id="docker-compose">4. Docker Compose </Typography>

        <Typography component="p">
          Docker Composeは、複数のコンテナを一括で管理・起動するためのツールです。通常、複数のコンテナを立ち上げるには、それぞれのコンテナを手動で起動し、Mount、Docker Networkの設定が必要ですが、Docker Composeを使用すると、**YAMLファイルに定義された設定(Mountなど)**に基づいて、複数のコンテナを一行のコマンドで起動、削除が完了します。
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <img src={docker_tutorial_4} alt="表示できません" style={{ maxWidth: '100%' }} />
        </Box>

        <Typography component="p">
          ※Dockerfile は、単一のコンテナの動作に必要な環境や設定（ベースイメージ、コマンド、ファイルコピーなど）を記述する設計図です。<br />
          docker-compose.yaml は、複数のコンテナで構成されるアプリケーション全体の設定（各コンテナの定義、ネットワーク、ボリュームなど）を記述し、それらの連携を管理するための設定ファイルです。
        </Typography>
        <Typography variant="h2" id="summary">5. まとめ</Typography>

        <Typography component="p">
          Dockerは、開発環境や運用環境を統一し、効率的な開発をサポートする強力なツールです。コンテナを使うことで、開発環境を簡単に再現可能にし、環境に依存しないアプリケーションを作成できます。また、Docker Composeやネットワーク設定を活用することで、複雑なシステムの構築も簡単に行えます。
        </Typography>

        <Typography component="p">
          これからDockerを使って開発を行う際には、公式ドキュメントやチュートリアルを参考にしながら学んでいくことをお勧めします。
        </Typography>
      </Box>
    </Container >
  );
};

export default DockerTutorial;
