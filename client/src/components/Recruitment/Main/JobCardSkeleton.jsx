import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function JobCardSkeleton() {
    return (
        <>
            <div className="flex flex-wrap justify-between">
                {[...Array(10)].map((_, index) => (
                    <div className="p-2 lg:w-1/2 w-full" key={index}>
                        <div className="p-2 h-48 flex flex-row justify-center border rounded-lg shadow-md">
                            <div class="m-1 w-1/2">
                                <Skeleton className=" w-full h-full" />
                            </div>
                            <div class="m-2 py-10 w-2/3">
                                <Skeleton className="" />
                                <Skeleton className="" />
                                <Skeleton className="" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
