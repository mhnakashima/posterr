import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { type FormEvent, useCallback, useRef, useState } from 'react';
import {
  POSTERR_MAX_CHAR_POST_LENGTH,
  POSTERR_MIN_INPUT_LENGTH,
} from '../../../api/constants';
import { usePosts } from '../../../context/PostsContext';
import { useModal } from '../../../context/ModalContext';
import { useProfile } from '../../../context/UserContext';
import Avatar from '../../avatar/Avatar';
import type { PostData, PostType } from '../../../types';

interface PostAddProps {
  quotedPost?: PostData;
  typeOfPost?: PostType;
}

const PostAdd = ({ quotedPost, typeOfPost }: PostAddProps) => {
  const { onAddPost } = usePosts();
  const [body, setBody] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { isModalOpen, closeModal } = useModal();
  const { profileInfo } = useProfile();
  const formRef = useRef<HTMLFormElement>(null);

  const isExpanded = isFocused || body.length > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!body) return;

    const post: PostData = {
      postBody: body,
      user: profileInfo,
      typeOfPost: typeOfPost || 'post',
      quotedPost,
    };

    onAddPost(post);
    setBody('');
    setIsFocused(false);

    if (isModalOpen) {
      closeModal();
    }
  };

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      if (
        !formRef.current?.contains(document.activeElement) &&
        body.length === 0
      ) {
        setIsFocused(false);
      }
    }, 150);
  }, [body]);

  const charPercent = Math.floor(
    ((body.length || 0) / POSTERR_MAX_CHAR_POST_LENGTH) * 100,
  );

  return (
    <section className="px-4 py-3" aria-label="Create post">
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="flex items-start gap-3">
          <div className="pt-1">
            <Avatar
              firstName={profileInfo.firstName}
              lastName={profileInfo.lastName}
            />
          </div>

          <div className="flex-1 min-w-0">
            <textarea
              className={`w-full bg-transparent resize-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 ${
                isExpanded ? 'h-20' : 'h-8 overflow-hidden leading-8'
              }`}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={handleBlur}
              placeholder={
                typeOfPost === 'quote' ? 'Add a comment...' : "What's new?"
              }
            />
          </div>

          {!isExpanded && (
            <button
              type="button"
              onClick={() => setIsFocused(true)}
              className="px-4 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shrink-0"
            >
              Post
            </button>
          )}
        </div>

        <div
          className={`transition-all duration-200 overflow-hidden ${
            isExpanded ? 'max-h-20 opacity-100 mt-2 ml-11' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mb-2">
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1">
              <div
                className={`${
                  charPercent > 95 ? 'bg-red-500' : 'bg-blue-500'
                } h-1 rounded-full transition-all duration-150`}
                style={{ width: `${charPercent}%` }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={
              body.length < 3 || body.length > POSTERR_MAX_CHAR_POST_LENGTH
            }
            className={`${
              body.length < POSTERR_MIN_INPUT_LENGTH ||
              body.length > POSTERR_MAX_CHAR_POST_LENGTH
                ? 'opacity-40 cursor-not-allowed'
                : ''
            } px-5 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-lg enabled:hover:bg-blue-600 enabled:active:bg-blue-700 transition-colors`}
          >
            Post
            <PaperAirplaneIcon className="h-4 w-4 ml-1.5 inline" />
          </button>
        </div>
      </form>
    </section>
  );
};

export default PostAdd;
