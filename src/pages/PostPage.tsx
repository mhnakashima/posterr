import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header/Header';
import Modal from '../components/modal/Modal';
import PostAdd from '../components/posts/post/PostAdd';
import Sidebar from '../components/sidebar/Sidebar';
import BottomNav from '../components/bottomNav/BottomNav';
import { usePosts } from '../context/PostsContext';
import PostContainer from '../features/PostContainer';
import type { PostData } from '../types';

const PostPage = () => {
  const { collection } = useParams();
  const { posts, quotedPost, setCollection } = usePosts();
  const [, setUserQuotedPost] = useState<PostData | undefined>();

  useEffect(() => {
    if (collection) {
      setCollection(collection);
    }

    if (quotedPost) {
      setUserQuotedPost(quotedPost);
    } else {
      setUserQuotedPost(undefined);
    }
  }, [posts, quotedPost, collection, setCollection]);

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <Header />

      <main className="lg:ml-16 pb-16 lg:pb-0">
        <div className="max-w-[600px] mx-auto">
          <div className="sticky top-0 lg:top-0 z-30 bg-white dark:bg-gray-900 rounded-b-2xl shadow-sm dark:shadow-gray-900/50 border-x border-b border-gray-200/60 dark:border-gray-800">
            <PostAdd />
          </div>
          <PostContainer />
        </div>
      </main>

      <BottomNav />
      <Modal />
    </div>
  );
};

export default PostPage;
