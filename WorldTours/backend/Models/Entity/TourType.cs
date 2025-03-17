namespace backend.Models.Entity
{
    public class TourType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PathToImage { get; set; }

        // Навигационное свойство для связи многие-ко-многим
        public ICollection<Tour> Tours { get; set; }
    }
}
