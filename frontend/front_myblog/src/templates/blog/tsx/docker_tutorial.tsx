import React from 'react';
import { Container, Typography, Box, Link, Divider, List, ListItem, ListItemText } from '@mui/material';

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
          Dockerのチュートリアルを読んで理解するのに苦労したので,これからDockerを学ぶ方々の助けになればと思い書いています.また,公式ドキュメントを読むのが一番の勉強になると考えているのでここでは概念的な話を行います.
        </Typography>

        <Typography variant="h2" id="docker-what">1. Dockerとは</Typography>
        <Typography component="p">
          Dockerを一言でまとめると<b>仮想環境のコンテナ化とその配布・管理を行うためのプラットフォーム</b>である.また,OSや環境変数の違いを吸収してくれるため複数人での開発において環境特有のエラーを防ぐことができる。
        </Typography>
        <Box sx={{ textAlign: 'center', my: 2 }}>
          <img src="/static/images/docker/docker_tutorial_1.png" alt="表示できません" style={{ maxWidth: '100%' }} />
        </Box>
        <Typography>
          <b>Docker用語</b>
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="仮想環境=コンテナ" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Docker Image=コンテナの元になるもの設定ファイル,スクリプトなどが含まれる" />
          </ListItem>
        </List>
        <Typography component="p">
          Dockerサービスの一つである<b>Docker Hub</b>には様々なDocker Image(イメージ)が置かれており<b>Docker pull</b>コマンドでイメージのダウンロードを行うか<b>Dockerfile & docker buildコマンド</b>を使用してイメージを作成することができる.
        </Typography>

        <Typography variant="h2" id="mount">2. Mount</Typography>
        <Typography component="p">
          Dockerでコンテナを使う場合、データの永続化やファイルの共有が必要になることが多い。これを実現するのが<b>Mount</b>です。Mountには主に<b>ボリューム</b>と<b>バインドマウント</b>の2種類があります。
        </Typography>
        <Typography component="p">
          <b>ボリューム</b>は、コンテナの外部で管理されるデータストレージであり、コンテナのライフサイクルに依存しません。コンテナが削除されてもデータは保持されます。
        </Typography>
        <Typography component="p">
          <b>バインドマウント</b>は、ホストマシンの特定のディレクトリをコンテナ内にマウントする方法です。ホストとコンテナ間でファイルを共有するために使用します。
        </Typography>

        <Typography variant="h2" id="docker-network">3. Docker Network</Typography>
        <Typography component="p">
          Dockerコンテナは、デフォルトで独立したネットワーク環境で動作しますが、複数のコンテナが相互に通信するためには、ネットワーク設定が必要です。Dockerでは、コンテナ間通信を管理するためにネットワークを使用します。
        </Typography>
        <Typography component="p">
          <b>ブリッジネットワーク</b>は、コンテナ間で通信を可能にするデフォルトのネットワークモードです。コンテナが同じネットワークに接続されていれば、互いに通信ができます。
        </Typography>
        <Typography component="p">
          <b>ブリッジネットワーク</b>は、コンテナ間で通信を可能にするデフォルトのネットワークモードです。コンテナが同じネットワークに接続されていれば、互いに通信ができます。
          <b>ホストネットワーク</b>は、コンテナがホストマシンのネットワークを直接使用するモードです。これにより、コンテナがホストマシンと同じIPアドレスを使用します。
        </Typography>

        <Typography variant="h2" id="docker-compose">4. Docker Compose</Typography>
        <Typography component="p">
          Docker Composeは、複数のコンテナを一括で管理・起動するためのツールです。通常、複数のコンテナを一度に立ち上げるには、それぞれのコンテナを手動で起動し、設定する必要がありますが、Docker Composeを使用すると、設定ファイル（docker-compose.yml）を一度作成するだけで、複数のコンテナを簡単に管理できます。
        </Typography>
        <Typography component="p">
          例えば、Webアプリケーションとデータベースを連携させる際に、Composeファイルを使って両方のコンテナを一度に起動できます。
        </Typography>
        <Box sx={{ textAlign: 'center', my: 2 }}>
          <img src="/static/images/docker/docker_compose_example.png" alt="表示できません" style={{ maxWidth: '100%' }} />
        </Box>

        <Typography variant="h2" id="summary">5. まとめ</Typography>
        <Typography component="p">
          Dockerは、開発環境や運用環境を統一し、効率的な開発をサポートする強力なツールです。コンテナを使うことで、開発環境を簡単に再現可能にし、環境に依存しないアプリケーションを作成できます。また、Docker Composeやネットワーク設定を活用することで、複雑なシステムの構築も簡単に行えます。
        </Typography>
        <Typography component="p">
          これからDockerを使って開発を行う際には、公式ドキュメントやチュートリアルを参考にしながら学んでいくことをお勧めします。
        </Typography>
      </Box>
    </Container>
  );
};

export default DockerTutorial;
