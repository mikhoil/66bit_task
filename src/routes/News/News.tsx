import { useCallback, useContext, useEffect, useState } from 'react';
import { New } from '../../components/New/New';
import { INew } from '../../types';
import axios from '../../axios';
import PullToRefresh from 'react-simple-pull-to-refresh';
import ThemeContext from '../../components/Layout/ThemeContext';
import InfiniteScroll from 'react-infinite-scroll-component';

export const News = () => {
    const [theme] = useContext(ThemeContext);
    const [fetchedNews, setFetchedNews] = useState<INew[]>([]);

    const fetchMoreNews = useCallback(
        () =>
            setTimeout(() => {
                (async () =>
                    setFetchedNews([
                        ...fetchedNews,
                        ...(
                            await axios.get<INew[]>(
                                `/news/get?page=${
                                    fetchedNews.length / 10 + 1
                                }&count=10`
                            )
                        ).data,
                    ]))();
            }, 500),
        [fetchedNews]
    );

    const refetchNews = useCallback(async () => {
        setFetchedNews(
            (
                await axios.get<INew[]>(
                    `/news/get?page=1$count=${fetchedNews.length}`
                )
            ).data
        );
    }, [fetchedNews]);

    useEffect(() => {
        (async () =>
            setFetchedNews(
                (await axios.get<INew[]>('news/get?page=1&count=10')).data
            ))();
    }, []);

    return (
        <div
            style={{
                color: `${theme?.textColor}`,
                background: `${theme?.mainColor}`,
            }}
            className={`p-5`}
        >
            <InfiniteScroll
                dataLength={fetchedNews.length}
                next={fetchMoreNews}
                hasMore={true}
                loader={<h1 className="text-center text-xl">Loading...</h1>}
                scrollThreshold={'10px'}
                scrollableTarget="scrollable"
            >
                <PullToRefresh onRefresh={refetchNews}>
                    <ul>
                        {fetchedNews.map(({ id, ...fetchedNew }, index) => (
                            <New {...fetchedNew} key={`${id}${index}`} />
                        ))}
                    </ul>
                </PullToRefresh>
            </InfiniteScroll>
        </div>
    );
};
