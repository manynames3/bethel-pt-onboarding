window.ABCPRAISE_ROLES = [
  {
    slug: "acoustic-guitar",
    tag: "어쿠스틱 기타",
    equipment: "Two Notes Opus DI",
    title: "어쿠스틱 기타 온보딩",
    summary: "Opus DI를 기준으로 안정적인 어쿠스틱 톤과 Aviom 개인 믹스를 준비합니다.",
    focus: ["튜닝", "Opus DI", "Aviom"],
    setup: [
      "연결하기 전에 튜닝한 뒤 기타 출력을 Opus 입력에 연결합니다.",
      "사운드체크 전에 사용할 프리셋을 찬양 인도자나 담당자와 확인합니다.",
      "Opus XLR 출력을 어쿠스틱으로 배정된 스테이지 입력에 연결합니다.",
      "출력 레벨은 여유 있게 낮게 시작하고, 최종 하우스 볼륨은 FOH가 잡도록 둡니다."
    ],
    monitoring: [
      "클릭 또는 템포 소스를 먼저 작게 올립니다.",
      "찬양 인도자와 리드 보컬을 중앙에 두고 본인 기타는 필요한 만큼만 올립니다.",
      "베이스와 킥은 박자를 확인할 정도로만 넣어 전체 믹스를 가볍게 유지합니다."
    ],
    references: [
      {
        label: "Opus preset",
        title: "Two Notes Opus 어쿠스틱 프리셋",
        image: "assets/opus-acoustic-presets.webp",
        alt: "Two Notes Opus DI에 부착된 Bethel acoustic preset 번호표",
        note: "사진 기준 현재 선택된 프리셋은 06 - BETHEL GIBSON J-45입니다.",
        columns: ["번호", "프리셋"],
        rows: [
          ["01", "BETHEL DI DRY"],
          ["02", "BETHEL DI PIEZO"],
          ["03", "BETHEL MARTIN HD-28"],
          ["04", "BETHEL YAMAHA L16"],
          ["05", "BETHEL TAYLOR 816"],
          ["06", "BETHEL GIBSON J-45"],
          ["07", "BETHEL GIBSON SJ-200"],
          ["08", "BETHEL MCP HOLY GRAIL"]
        ]
      }
    ],
    checklist: [
      "튜닝 완료",
      "Opus 프리셋 확인",
      "XLR 출력 연결",
      "Aviom 기본 믹스 저장"
    ]
  },
  {
    slug: "bass",
    tag: "베이스",
    equipment: "Markbass Little Mark III",
    title: "베이스 온보딩",
    summary: "Markbass Little Mark III의 gain과 master를 분리해서 안정적인 저역을 만듭니다.",
    focus: ["Gain", "DI out", "Kick"],
    setup: [
      "베이스를 입력에 연결하고 master volume은 낮춘 상태에서 시작합니다.",
      "가장 크게 연주할 부분을 치면서 gain을 올리되, 특히 액티브 베이스나 페달 사용 시 clip 불이 켜지지 않는지 확인합니다.",
      "clip 불이 들어오면 베이스 볼륨 또는 페달 output level을 필요한 만큼 낮춰 입력이 깨지지 않게 합니다.",
      "FOH 신호가 깨끗하고 예측 가능하도록 앰프 EQ는 과하게 만지지 않습니다.",
      "DI out을 FOH로 보내고, 캐비넷을 쓰는 경우 master volume은 무대 느낌 조절용으로만 사용합니다."
    ],
    monitoring: [
      "킥과 클릭을 먼저 맞추고 그 위에 본인 베이스를 얹습니다.",
      "찬양 인도자와 메인 건반을 충분히 들리게 둡니다.",
      "저역이 과하게 쌓이면 master보다 Aviom 안의 bass 채널을 먼저 낮춥니다."
    ],
    checklist: [
      "Clip light 꺼짐 확인",
      "DI out 연결",
      "Master 낮게 시작",
      "킥/클릭 밸런스 확인"
    ]
  },
  {
    slug: "electric-guitar",
    tag: "일렉 기타",
    equipment: "페달보드 XLR/DI 연결",
    title: "일렉 기타 온보딩",
    summary: "페달보드 출력 방식을 먼저 확정하고 리듬/리드 볼륨 차이를 정리합니다.",
    focus: ["Mono/Stereo", "DI", "Gain stage"],
    setup: [
      "예배 전 mono 또는 stereo 운용 여부를 먼저 확인합니다.",
      "보드에 XLR out이 있으면 배정된 스테이지 입력에 직접 연결합니다.",
      "보드 출력이 1/4 inch이면 스네이크로 보내기 전에 DI box를 거칩니다.",
      "드라이브와 부스트 게인을 확인해 리드 톤이 리듬 톤보다 과하게 튀지 않게 합니다."
    ],
    monitoring: [
      "찬양 인도자, 클릭, 어쿠스틱, 메인 건반을 기준으로 본인 기타를 얹습니다.",
      "리드 파트가 있는 곡은 보컬 멜로디를 덮지 않는 수준으로 모니터링합니다.",
      "딜레이와 리버브가 많은 패치는 Aviom에서 조금 작게 듣는 편이 안전합니다."
    ],
    checklist: [
      "출력 방식 확인",
      "DI 또는 XLR 연결",
      "리듬/리드 레벨 확인",
      "튜닝 및 노이즈 확인"
    ]
  },
  {
    slug: "main-keys",
    tag: "메인 건반",
    equipment: "Nord Piano 4",
    title: "메인 건반 온보딩",
    summary: "Nord Piano 4를 기준으로 예배의 중심 화성과 인트로, 전환을 안정적으로 담당합니다.",
    focus: ["Piano patch", "Transitions", "Leader"],
    setup: [
      "리허설 전에 메인 피아노 패치를 확인하고 예배 중에는 같은 기준으로 유지합니다.",
      "Master volume은 매주 반복 가능한 위치에 두고, 하우스 레벨은 FOH가 조절하도록 합니다.",
      "보컬을 덮지 않도록 sustain과 dynamics를 신중하게 사용합니다.",
      "전체 팀이 시작하기 전에 세컨 건반과 intro, pad, transition 구간을 맞춥니다."
    ],
    monitoring: [
      "찬양 인도자와 리드 보컬을 가장 먼저 올립니다.",
      "세컨 건반과 어쿠스틱을 들어 화성 충돌이 없는지 확인합니다.",
      "클릭 또는 템포 소스는 곡 시작과 전환이 흔들리지 않을 정도로만 둡니다."
    ],
    checklist: [
      "메인 패치 확인",
      "볼륨 기준 위치 확인",
      "Intro/ending 확인",
      "세컨 건반 역할 분리"
    ]
  },
  {
    slug: "second-keys",
    tag: "세컨 건반",
    equipment: "Yamaha S90 ES",
    title: "세컨 건반 온보딩",
    summary: "Yamaha S90 ES로 pad, strings, organ, synth 등 보조 질감을 정리합니다.",
    focus: ["Patch order", "Layers", "Space"],
    setup: [
      "사운드체크 전에 파트가 pad, strings, organ, synth, 보조 piano 중 무엇인지 확인합니다.",
      "예배 순서대로 patch 변경을 적어 두어 전환이 조용하고 빠르게 되게 합니다.",
      "키보드 안에서 layer balance를 먼저 맞춘 뒤 FOH로 일정한 레벨을 보냅니다.",
      "메인 건반을 위해 voicing은 단순하게, 질감은 더 높거나 넓게 잡아 공간을 만듭니다."
    ],
    monitoring: [
      "메인 건반과 리드 보컬을 먼저 올려 본인 파트가 어디에 들어갈지 확인합니다.",
      "Pad는 크게 들을수록 팀 전체가 무거워질 수 있어 작게 시작합니다.",
      "Patch마다 출력 차이가 있으면 Aviom보다 키보드 안에서 먼저 정리합니다."
    ],
    checklist: [
      "Patch 순서 메모",
      "Layer balance 확인",
      "메인 건반과 역할 분리",
      "전환 소리 확인"
    ]
  },
  {
    slug: "drums",
    tag: "드럼",
    equipment: "핸드폰 클릭 사용",
    title: "드럼 온보딩",
    summary: "핸드폰 클릭을 안정적으로 사용하고 팀 전체의 tempo 기준을 세웁니다.",
    focus: ["Click", "Wired in-ear", "Tempo"],
    setup: [
      "메트로놈 앱이나 제공된 클릭 트랙을 사용하고 리허설 전에 tempo를 세팅합니다.",
      "딜레이가 생기지 않도록 Bluetooth 대신 유선 이어폰이나 in-ear를 사용합니다.",
      "핸드폰은 방해금지 모드로 두고 필요하면 화면이 꺼지지 않게 설정합니다.",
      "팀에서 요청하지 않는 한 클릭은 본인 귀에만 들리게 합니다."
    ],
    monitoring: [
      "클릭, 찬양 인도자, 베이스, 메인 건반, 리드 보컬 순서로 맞춥니다.",
      "베이스가 늦거나 앞서는지 확인할 수 있을 만큼만 충분히 듣습니다.",
      "찬양 인도자의 cue가 묻히지 않도록 click volume을 과하게 올리지 않습니다."
    ],
    checklist: [
      "템포 확인",
      "방해금지 모드",
      "유선 이어폰 또는 in-ear",
      "클릭 볼륨 확인"
    ]
  },
  {
    slug: "singers",
    tag: "싱어",
    equipment: "마이크팩 및 무선 마이크",
    title: "싱어 온보딩",
    summary: "무선 마이크와 마이크팩을 안정적으로 사용하고 보컬 블렌드를 맞춥니다.",
    focus: ["Channel", "Battery", "Blend"],
    setup: [
      "배정된 무선 마이크나 마이크팩을 받고 channel label을 확인합니다.",
      "라인 체크 전에 새 배터리 또는 충분한 충전 상태를 확인합니다.",
      "팩은 단단히 고정하고 안테나는 펴진 상태로 가리지 않습니다.",
      "요청이 있을 때만 mute하고, 기본 채널 관리는 FOH가 하도록 둡니다."
    ],
    monitoring: [
      "찬양 인도자와 메인 건반 또는 어쿠스틱을 먼저 듣습니다.",
      "본인 목소리는 pitch를 확인할 정도로만 올리고 전체 보컬 blend를 듣습니다.",
      "필요한 곡에서만 click을 작게 추가합니다."
    ],
    checklist: [
      "마이크 번호 확인",
      "배터리 확인",
      "팩 고정",
      "보컬 blend 확인"
    ]
  },
  {
    slug: "aviom",
    tag: "악기팀 공통",
    equipment: "Aviom 모니터링",
    title: "Aviom 공통 온보딩",
    summary: "모든 파트가 같은 기준으로 개인 모니터를 빠르게 세팅할 수 있게 합니다.",
    focus: ["Low master", "CH 13", "Preset"],
    setup: [
      "Master volume은 낮게 시작하고, 왜곡과 음질 저하를 피하기 위해 12시 방향을 넘기지 않는 것을 권장합니다.",
      "찬양 인도자, 클릭이나 tempo source, 본인 channel을 중심으로 믹스를 만듭니다.",
      "가운데 공간이 답답하지 않도록 관련 악기는 살짝 pan을 나눕니다.",
      "선호 믹스는 Recall + Group + 원하는 channel number로 저장할 수 있습니다.",
      "저장한 preset은 다음에 Recall + 저장할 때 사용한 channel number를 눌러 불러옵니다.",
      "공용 routing을 바꾸거나 라벨이 붙은 cable을 뽑기 전에는 반드시 확인합니다."
    ],
    monitoring: [
      "가장 먼저 찬양 인도자와 리드 보컬을 명확히 둡니다.",
      "그 다음 tempo source와 본인 악기 또는 보컬을 올립니다.",
      "Channel 13은 main speaker output과 같은 믹스입니다.",
      "단순하게 듣고 싶을 때는 channel 13을 기준으로 올리고 본인 악기 channel만 더 올리면, 각 channel을 하나씩 조정하지 않아도 본인을 잘 들을 수 있습니다.",
      "전체 band를 크게 듣기보다 cue와 tempo를 놓치지 않는 믹스를 만듭니다."
    ],
    references: [
      {
        label: "악기팀 공통",
        title: "키 조정 리소스",
        note: "컴퓨터에서 음원과 연습할 때 악보 키와 음원 키가 다르면 Chrome Extension으로 조정할 수 있습니다.",
        links: [
          {
            title: "Transpose Chrome Extension",
            description: "YouTube 음원 재생 중 pitch와 speed를 조정할 때 사용합니다.",
            href: "https://chromewebstore.google.com/detail/transpose-%E2%96%B2%E2%96%BC-pitch-%E2%96%B9-spee/ioimlbgefgadofblnajllknopjboejda?hl=en"
          }
        ]
      },
      {
        label: "Aviom A-16II",
        title: "Aviom 채널 번호표",
        image: "assets/aviom-a16ii-channel-map.webp",
        alt: "Aviom A-16II 개인 모니터 믹서와 하단 채널 번호표",
        note: "사진 하단 라벨 기준입니다. 각 스테이션의 실제 라벨이 다르면 현장 라벨을 우선합니다.",
        columns: ["채널", "라벨", "용도"],
        rows: [
          ["1", "PASTOR", "목회자/말씀 마이크"],
          ["2", "LEAD", "찬양 인도자"],
          ["3", "2ND P", "보조 인도/마이크"],
          ["4", "A.G", "어쿠스틱 기타"],
          ["5", "KEY", "메인 건반"],
          ["6", "2KEY", "세컨 건반"],
          ["7", "E.G1", "일렉 기타 1"],
          ["8", "E.G2", "일렉 기타 2"],
          ["9", "BASS", "베이스"],
          ["10", "KICK", "킥"],
          ["11", "S.N", "스네어"],
          ["12", "L-R", "메인 L/R"],
          ["13", "PGM", "메인 스피커 출력과 같은 믹스"],
          ["14", "EX/WH", "외부/무선"],
          ["15", "TALK", "토크백"],
          ["16", "C", "클릭"]
        ]
      }
    ],
    checklist: []
  }
];
