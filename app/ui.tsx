"use client";

import { useQuery } from "@tanstack/react-query";
import * as storageActions from "actions/storage-actions";
import ImageCard from "components/image-card";
import ImageUploadArea from "components/image-upload-area";
import SearchInput from "components/search-input";
import Spacer from "components/spacer";
import { useState } from "react";

export default function UI() {
  const [search, setSearch] = useState("");

  const searchImagesQuery = useQuery({
    queryKey: ["images", search],
    queryFn: () => storageActions.searchImages({ search }),
  });

  return (
    <main className="p-4">
      <div className="flex items-center gap-1">
        <img
          src={"/images/dropbox_icon.png"}
          alt="dropbox_icon"
          className="w-8"
        />
        <span className="font-bold text-lg">Minibox</span>
      </div>
      <Spacer height={4} />

      <SearchInput search={search} setSearch={setSearch} />
      <Spacer height={4} />

      <ImageUploadArea />
      <Spacer height={4} />

      {searchImagesQuery.data && (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
          {searchImagesQuery.data.map((image, index) => (
            <div className="col-span-1" key={index}>
              <ImageCard image={image} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
