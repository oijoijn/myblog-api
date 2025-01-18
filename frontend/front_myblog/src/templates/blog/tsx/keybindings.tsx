import { Container, Typography, Box, List, Divider, ListItem, ListItemText, Link } from '@mui/material';
import key_gif from '/images/keybindings/key.gif'

const Keybindings: React.FC = () => {
    return (
        <Container>
            <Box id='toc'>
                <Typography variant="h2">目次</Typography>
                <List>
                    <ListItem disablePadding>
                        <ListItemText primary={<Link href='#pc-key'>1. パソコンを使いやすくするために</Link>} />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText primary={<Link href='#change-key'>2. Change Key</Link>} />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText primary={<Link href='#powertoys'>3. PowerToys</Link>} />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText primary={<Link href='#autohotkey'>4. AutoHotkey</Link>} />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText primary={<Link href='#summary'>5. まとめ</Link>} />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText primary={<Link href='#vscode-vim'>番外編. Vscode Vim</Link>} />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText primary={<Link href='#chrome-vimium'>番外編. Chrome Vimium</Link>} />
                    </ListItem>
                </List>
            </Box>

            <Box sx={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6, padding: 3 }}>
                <Divider />
                <Typography variant="h2" id='pc-key'>1. パソコンを使いやすくするために</Typography>

                <Typography component="p">
                    ショートカットキーを使用していますか？パソコンのキーバインドを変更することでほとんどの操作をマウスを使用せずに終わらすことができます。
                    以下のGIFの操作はすべてキーボードだけで行われています。
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    <img src={key_gif} alt='表示できません' />
                </Box>

                <Typography component="p">
                    後で説明しますが、キーバインドを変更した際の優先順位は以下の通りです。<br />
                    Change Key &gt; PowerToys &gt; AutoHotkey &gt; ソフトウェア
                    <br />
                    <br />
                </Typography>

                <Typography variant="h2" id='change-key'>2. Change Key</Typography>
                <Typography component="p">
                    <Link href="https://forest.watch.impress.co.jp/library/software/changekey/" target="_blank" rel="noopener">
                        Change Key
                    </Link>を使用すると、CtrlキーとCapsLockキーを入れ替えられます。Ctrlは使用頻度が高いわりに押しにくい場所にあり、逆にCapsLockはほとんど使用しない割に小指で押せるところにあり一番に変更すべきキーとして上げられます。<br /><br />
                    Change Keyの欠点として、レジストリを操作するため、社内PCなどでは使用できない可能性とショートカットキーに対しての変更ができないところです。
                    <br />
                    例えば、右のAlt+Hを押しているときだけ、Windows+&lt;の動作をさせるなど...(開いているwindowの場所を変更する)。
                    <br />
                    <br />
                </Typography>

                <Typography variant="h2" id='powertoys'>3. PowerToys</Typography>
                <Typography component="p">
                    <Link href="https://learn.microsoft.com/ja-jp/windows/powertoys/install" target="_blank" rel="noopener">
                        PowerToys
                    </Link>を使用すると、ショートカットキーの再登録ができます。上記の弱点を補うために私は使用しています。また、Microsoftが提供しているため、安心してインストールできます。注意点として、PowerToysでCtrlキーとCapsLockキーを入れ替えることができますが、動作が不安定になるため、CtrlとCapsLockの入れ替えにおいてはChange Keyまたはレジストリを直接書き換えることをおすすめします。
                    <br />
                    <br />
                </Typography>

                <Typography component="p">
                    ※Ctrl+[ で日本語配列・英語配列キーボードどちらもEscキーと似たような動作をしますが、Escキーと完全に同じ動作ではないため、PowerToysで変更することをおすすめします.
                </Typography>

                <Typography variant="h2" id='autohotkey'>4. AutoHotkey</Typography>
                <Typography component="p">
                    <Link href="https://www.autohotkey.com/" target="_blank" rel="noopener">
                        AutoHotkey
                    </Link>はプログラミング言語であり、上記ツールよりも自由度の高い設定を行えます.しかし、Windows 11との相性が悪いのか、動作が一番安定しません.それでも、マウスの動作制御、キー、ショートカットキーの入れ替えなどが可能で、AutoHotkeyでできないことはほとんどないと言えます.
                    <br />
                    <br />
                </Typography>

                <Typography variant="h2" id='summary'>5. まとめ</Typography>
                <Typography component="p">
                    キーの入れ替え = Change Key<br />
                    ショートカットキーの入れ替え = PowerToys<br />
                    それ以外の高度な設定 = AutoHotkey<br />
                </Typography>

                <Typography component="p">
                    キーバインドを変更した場合の優先順位<br />
                    Change Key &gt; PowerToys &gt; AutoHotkey &gt; ソフトウェア
                    <br />
                    <br />
                </Typography>

                <Typography variant="h2" id='vscode-vim'>番外編. Vscode Vim</Typography>
                <Typography component="p">
                    Vscodeの拡張機能にVimがあります。Vimとはエディターの一種で、キーボードだけでカーソル移動やファイル編集が可能になります。Vimをインストールすることでプログラミング中もホームポジションやマウスを触らずに操作することが可能になります。
                    <br />
                    <br />
                </Typography>

                <Typography variant="h2" id='chrome-vimium'>番外編. Chrome Vimium</Typography>
                <Typography component="p">
                    <Link href="https://chromewebstore.google.com/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb?hl=ja" target="_blank" rel="noopener">
                        Vimium
                    </Link>は、Google Chromeに対してVimのような操作を提供する拡張機能です。Shift + j、 Shift + kでタブの移動が可能ですが、PDFを開くとVimuimが機能しません。そのため、PowerToysでShift + j、 Shift + k(Vimiumの機能)をCtrl + Tab、 Ctrl + Shift + Tab(Chromeの機能)に再登録することをおすすめします。<br />
                    <Link href="https://support.google.com/chrome/answer/157179?hl=ja&co=GENIE.Platform%3DDesktop#zippy=%2C%E3%82%BF%E3%83%96%E3%81%A8%E3%82%A6%E3%82%A3%E3%83%B3%E3%83%89%E3%82%A6%E3%81%AE%E3%82%B7%E3%83%A7%E3%83%BC%E3%83%88%E3%82%AB%E3%83%83%E3%83%88" target="_blank" rel="noopener">
                        Chromeのショートカットキー
                    </Link>
                </Typography>
            </Box>

        </Container>
    );
};

export default Keybindings;