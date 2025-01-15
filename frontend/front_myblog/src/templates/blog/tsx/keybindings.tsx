import React from 'react';
import { Typography, Box } from '@mui/material';
import { containerStyle } from '../containerStyle';

export const keybindings: React.FC = () => {
    return (
        <Box>
            <Box id='toc'>
                <Typography variant="h2">目次</Typography>
                <ul>
                    <li><a href='#pc-key'>1. パソコンを使いやすくするために</a></li>
                    <li><a href='#change-key'>2. Change Key</a></li>
                    <li><a href='#powertoys'>3. PowerToys</a></li>
                    <li><a href='#autohotkey'>4. AutoHotkey</a></li>
                    <li><a href='#summary'>5. まとめ</a></li>
                    <li><a href='#vscode-vim'>番外編. Vscode Vim</a></li>
                    <li><a href='#chrome-vimium'>番外編. Chrome Vimium</a></li>
                </ul>
            </Box>

            {/* {% include 'blog/article.html' %} は React コンポーネント内で直接インクルードできないため、
          もし `article.html` の内容も表示したい場合は、別途 React コンポーネントに変換し、
          ここでインポートして使用する必要があります。 */}

            <Box style={containerStyle}>
                <Typography variant="h2" id='pc-key'>1. パソコンを使いやすくするために</Typography>
                <Typography component="p">皆さんショートカットキーを使用していますか？パソコンのショートカットキーを使用することで以下のような操作が可能になります.</Typography>

                <Typography component="p">
                    後述しますが,キーバインドを変更した場合の優先順位は以下の通りです。<br />
                    Change Key &gt; PowerToys &gt; AutoHotkey &gt; ソフトウェア
                </Typography>


                <Typography variant="h2" id='change-key'>2. Change Key</Typography>
                <Typography component="p"><a href="https://forest.watch.impress.co.jp/library/software/changekey/">Change Key</a>を使用すると,CtrlキーとCapsLockキーを入れ替えられます.欠点として,レジストリを操作するため,社内のPCなどでは使用できない可能性があります.また,キーに対しては再登録を行えるのですが,ショートカットキーに対しては再登録などができません.</Typography>

                <Typography variant="h2" id='powertoys'>3. PowerToys</Typography>
                <Typography component="p"><a href="https://learn.microsoft.com/ja-jp/windows/powertoys/install">PowerToys</a>を使用すると,ショートカットキーの再登録ができます.また,Microsoftが提供しているため,安心してインストールできます.注意点として,PowerToysでCtrlキーとCapsLockキーを入れ替えると動作が不安定になるため,Change Keyまたはレジストリを直接書き換えることをおすすめします.</Typography>

                <Typography component="p">
                    豆知識：Ctrl+[ で日本語配列・英語配列キーボードどちらもEscキーと似たような動作をしますが,Escキーと完全に同じ動作ではないため,別途登録することをおすすめします.
                </Typography>

                <Typography variant="h2" id='autohotkey'>4. AutoHotkey</Typography>
                <Typography component="p"><a href="https://www.autohotkey.com/">AutoHotkey</a>はプログラミング言語であり,上記ツールよりも自由度の高い設定を行えます.しかし,Windows 11との相性が悪いのか,動作が一番安定しません.それでも,マウスの動作制御,キー,ショートカットキーの入れ替えなどが可能で,AutoHotkeyでできないことはほとんどないと言えます.</Typography>

                <Typography variant="h2" id='summary'>5. まとめ</Typography>
                <Typography component="p">
                    キーの入れ替え = Change Key<br />
                    ショートカットキーの入れ替え = PowerToys<br />
                    それ以外の高度な設定 = AutoHotkey<br />
                </Typography>

                <Typography component="p">
                    キーバインドを変更した場合の優先順位<br />
                    Change Key &gt; PowerToys &gt; AutoHotkey &gt; ソフトウェア
                </Typography>

                <Typography variant="h2" id='vscode-vim'>番外編. Vscode Vim</Typography>
                <Typography component="p">Vscodeの拡張機能にVimがあります.Vimとはエディターの一種で,キーボードだけでカーソル移動やファイル編集が可能になります.Vimをインストールすることでプログラミング中もホームポジションを崩さずに操作することが可能になります.</Typography>

                <Typography variant="h2" id='chrome-vimium'>番外編. Chrome Vimium</Typography>
                <Typography component="p"><a href="https://chromewebstore.google.com/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb?hl=ja">Vimium</a>は,Google Chromeに対してVimのような操作を提供する拡張機能です.Shift + j, Shift + kでタブの移動が可能ですが,PDFを開くとタブの移動が機能しません.そのため,PowerToysでShift + j, Shift + kをCtrl + Tab, Ctrl + Shift + Tabに再登録することをおすすめします。<a href="https://support.google.com/chrome/answer/157179?hl=ja&co=GENIE.Platform%3DDesktop#zippy=%2C%E3%82%BF%E3%83%96%E3%81%A8%E3%82%A6%E3%82%A3%E3%83%B3%E3%83%89%E3%82%A6%E3%81%AE%E3%82%B7%E3%83%A7%E3%83%BC%E3%83%88%E3%82%AB%E3%83%83%E3%83%88">Chromeのショートカットキー</a></Typography>
            </Box>

            {/* {% include 'blog/comments.html' %} は同様に、必要であれば React コンポーネントに変換して使用します。 */}
        </Box>
    );
};