-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;