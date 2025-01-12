import { Routes, Route } from "react-router-dom";
import { BlogList } from "./Page/blog/list.tsx";
import { BlogDetail } from "./Page/blog/detail.tsx";
import ButtonAppBar from './Navigation/header';
import Footer from './Navigation/footer';

export const AppRoutes = () => {
    return (
        <>
            <ButtonAppBar />
            <Routes>
                <Route path="/" element={<BlogList />} />
                <Route path="/blogs/:id/detail/" element={<BlogDetail />} />
            </Routes>
            <Footer />
        </>
    )
}
