import { createContext, useState, useEffect } from "react";
// Context; mevcut kullanıcıyı doğrulama, tema veya dil seçimi gibi React bileşen ağacında global olarak düşünülebilecek verileri paylaşmak için tasarlanmıştır.
// Context, prop’ları her seviyede manuel olarak geçmek zorunda kalmadan bileşen ağacı üzerinden veri iletmenin bir yolunu sağlar.
// onAuthStateChangedListener'i kullanmak için onu componentmount'a monte etmek istiyoruz. Bu yüzden useEffect kullanacağız.

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// erismek istenilen deger
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log(user);
      // App.jsx başlatıldığında, UserProvider'ımızı bağlayacağız. UserProvider'imiz, mount'ta ilk bu callback'i türetecek ve onStateChangeListener'i cagiracak.
      // O da bize bu callback'i verecek. Ve bu callback şunu söyleyecek; "Hey, durum ne olursa olsun, benim için kullanıcıyı kaydetmenizi istiyorum."
      if (user) {
        createUserDocumentFromAuth(user);
        // "auth'dan user gelirse, kullanıcı belgesi oluştur."
      }
      // "aksi takdirde, mevcut kullanıcıyı set et."
      setCurrentUser(user);
      // Kullanıcı oturumu kapatırsa, "null" depolanir. Kullanıcı oturum açarsa, user objesi saklanir.
    });
    return unsubscribe;
  }, []);
  // Önceki notlarda konustugumuz gibi, OnAuthStateChangeListener, bir tür callback fonksiyonu alır.
  // onAuthStateChange'in yaptığı şey, auth singleton'ımızın kimlik doğrulama state'i değiştiğinde bu callback'i çağırmasıdır.
  // Bu nedenle, kullanıcı oturum açtığında ya da kapattiginda bu bir auth değişikligi olarak kabul edilir. Cünkü her ikisinde de bir kimlik dogrulama sözkonusudur.
  // Yani her iki durumda da, yani bir kimlik doğrulaması söz konusu oldugunda callback başlatılacaktır.
  // Bu bir OpenListener'dir. Yani bu şey her zaman state'in değişip değişmediğini görmek üzere beklediği anlamına gelir.
  // Bunu, sanki biri orada durmuş ve bu auth state'deki değişiklikleri dinlemeye çalışıyormuş gibi hayal edebiliriz ve bu biri, state degistigi anda bir callback cagirir.
  // Yalniz sorun su ki, user.context component'i dogdugunda, artik ihtiyacimiz kalmadigi icin, ondan kurtulmamiz, dinlemeyi bırakmasını söylememiz gerekir. Aksi takdirde bir tür bellek sızıntısı meydana gelir.
  // Bunun kullanisli yolu yukarida tanimladigimiz unsubsrice'dir. Bize dinlemeyi bırakacak fonksiyonu return eder.
  // Yani biz bu işlevi, yalnızca bir kez, component dogdugunda çalıştırmak istiyoruz.

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
  // Oluşturulan her contexte bir dot provider vardır.
  // Dot provider ise, icerdeki değerlere erişmesi gereken diğer komponentleri saran componenttir.
};
