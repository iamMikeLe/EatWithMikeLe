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
