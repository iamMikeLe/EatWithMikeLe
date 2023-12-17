export type MealData = {
  mealId: string;
  imageUrl: string;
  title: string;
  description: string;
  tags: string[] | null;
  author: string | null;
  authorId: string;
  createdAt: string | null;
  modifiedAt: string | null;
};

export type MealFormValue = {
  imageUrl: string;
  title: string;
  description: string;
  tags: string[] | null;
};
