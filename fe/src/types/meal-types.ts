export type MealData = {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  tags: string[] | null;
  author: string | null;
  authorId: string;
  createdAt: string | null;
  modifiedAt: string | null;
};

export type PreConvertImage = {
  file: File;
  src: string;
};

export type MealFormValue = {
  imageUrl: string | null;
  title: string;
  description: string;
  tags: string[] | null;
  image: PreConvertImage | undefined;
};
