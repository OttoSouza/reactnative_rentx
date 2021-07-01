import React, { useState, useRef } from "react";
import { FlatList, ViewToken } from "react-native";
import { Bullet } from "../Bullet/index";
import { Container, ImageIndexes, CarImageWrapper, CarImage } from "./styles";

interface Props {
  imagesUrl: {
    id: string;
    photo: string;
  }[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export const ImageSlider: React.FC<Props> = ({ imagesUrl }) => {
  const [imageIndex, setImageIndex] = useState(0);

  // Obtem a referencia de cada imagem.
  // essa referencia é obtida por causa do useRef
  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((item, index) => (
          <Bullet active={index === imageIndex} key={item.id} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item.photo }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
};
