export type PopupController = {
  onSuccess?: () => void;
  onClose: () => void;
};

export type PaginateParamsType = {
  page: number;
  size: number;
};

export type PaginateType = {
  currentPage: number;
  pages: number;
  total: number;
};
