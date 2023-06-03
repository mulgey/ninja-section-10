import { useEffect, useState } from "react"

export const useFetching = (url) => {
  const [data, dataAksiyonu] = useState(null);
  const [yukleniyor, yukleniyorAksiyonu] = useState(false);
  const [hata, hataAksiyonu] = useState(null)

  // useEffect içerisinde async funct. kullanamayız. await'ler ile ilerliyoruz
  useEffect(() => {
    // fetch iptal edilirse cleanUp devreye girsin bölümü
    const kontrolcü = new AbortController();
     
    // bu kısımda async funct. kullanabiliriz
    const dataFetchleme = async () => {
      yukleniyorAksiyonu(true)

      try {
        // fetch fonksiyonu için opsiyonel object olarak cleanUp mekanizmasını yerleştirdik
        const yanıt = await fetch(url, { signal: kontrolcü.signal} );
        if (!yanıt.ok) {
          throw new Error("URL hatalı muhtemelen");
        // normalde else kısmı yoktu eğitimde, ben ekledim. hata varsa direkt sistemden çıkması için
        } else {
          const jsonVerisi = await yanıt.json();

          yukleniyorAksiyonu(false)
          dataAksiyonu(jsonVerisi)
          // önceki deneme hatalı ise, hata olmayan sonraki denemede hata durumunu kaldırmak gerekir
          hataAksiyonu(null)
        }
        
      } catch (fail) {
        // hata varsa yükleniyor durumu oluşturmayız
        yukleniyorAksiyonu(false)
        console.log(fail);
        // fetch iptal --> cleanUp ise ilk süreç, yoksa else çalışsın
        if (fail.name === "AbortError") {
          console.log('Süreç iptal edildi');
        } else {
          hataAksiyonu("I couldn't fetch any data")
          console.log(fail.message);
        }
      }            
    }

    // yukarıda fonksiyonu kurduk, aşağıda da ateşliyoruz
    dataFetchleme();

    // yine fetch iptal edilirse cleanUp devreye girsin bölümü
    return () => {
      kontrolcü.abort();
    }
  }, [url])

  // return sonrası array de olabilir ama biz object tercih ediyoruz
  // { data: data } = { data }
  return { data, yukleniyor, hata }
    
}