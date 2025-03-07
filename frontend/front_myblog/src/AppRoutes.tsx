import { Routes, Route } from 'react-router-dom';
import { BlogList } from '@/components/blog/list.tsx';
import { BlogDetail } from '@/components/blog/detail.tsx';
import Header from '@/components//navigation/header';
import Footer from '@/components/navigation/footer';
import { Signup } from '@/components/accounts/signup.tsx'
import { Login } from '@/components/accounts/login.tsx';
import { Commentslist } from '@/components/accounts/Commentslist.tsx';
import { Commentsedit } from '@/components/accounts/Commentsedit.tsx';
import { NotFound } from '@/components/navigation/NotFound.tsx';
import { LoginUserProvider } from '@/components/providers/LoginUserProvider.tsx';
import { CookiesProvider } from '@/components/providers/CookiesProvider.tsx';

export const AppRoutes = () => {
    return (
        <>

            <LoginUserProvider>
                <CookiesProvider>
                    <Header />
                    <Routes>
                        <Route path='/' element={<BlogList />} />
                        <Route path='/blogs/:id/detail/' element={<BlogDetail />} />
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/notfound' element={<NotFound />} />
                        <Route path='/commentslist' element={<Commentslist />} />
                        <Route path='/commentsedit' element={<Commentsedit />} />
                    </Routes>
                    <Footer />
                </CookiesProvider>
            </LoginUserProvider>
        </>
    )
}
