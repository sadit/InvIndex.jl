var documenterSearchIndex = {"docs":
[{"location":"invfile/","page":"Inv. Files","title":"Inv. Files","text":"\nCurrentModule = InvertedFiles\nDocTestSetup = quote\n    using InvertedFiles\nend","category":"page"},{"location":"invfile/#Inverted-files","page":"Inv. Files","title":"Inverted files","text":"","category":"section"},{"location":"invfile/","page":"Inv. Files","title":"Inv. Files","text":"append!\npush!","category":"page"},{"location":"invfile/#Base.append!","page":"Inv. Files","title":"Base.append!","text":"Base.append!(idx, db; parallel_block=1000, pools=nothing, tol=1e-6)\n\nAppends all db elements into the index idx. It work in parallel using all available threads.\n\nArguments:\n\nidx: The inverted index\ndb: The database of sparse objects, it can be only indices if each object is a list of integers or a set of integers (useful for BinaryInvertedFile),   sparse matrices, dense matrices, among other combinations.\nn: The number of items to insert (defaults to all)\n\nKeyword arguments:\n\nparallel_block: inserts parallel_block elements in parallel, this argument must be larger than Threads.nthreads() but also not so large since the algorithm take advantage of small parallel_block.\npools: unused argument but necessary by searchbatch (from SimilaritySearch)\ntol: controls what is a zero (i.e., weights < tol will be ignored).\n\n\n\n\n\nappend!(idx::KnrIndex, db; <kwargs>)\n\nAppends all items in the database db into the index\n\nArguments\n\nidx: the index structure\ndb: the objects to be appended\n\nKeyword arguments\n\nparallel_block: the number of elements to be inserted in parallel\npools: unused argument\nverbose: controls the verbosity of the procedure\n\n\n\n\n\n","category":"function"},{"location":"invfile/#Base.push!","page":"Inv. Files","title":"Base.push!","text":"push!(idx::AbstractInvertedFile, obj; pools=nothing, tol=1e-6)\n\nInserts a single element into the index. This operation is not thread-safe.\n\nArguments\n\nidx: The inverted index\nobj: The object to be indexed\n\nKeyword arguments\n\npools: unused argument\ntol: controls what is a zero (i.e., weight < tol will be ignored)\n\n\n\n\n\npush!(idx::KnrIndex, obj; pools=getpools(idx), encpools=getpools(idx.centers))\n\nInserts obj into the indexed\n\n\n\n\n\n","category":"function"},{"location":"invfile/","page":"Inv. Files","title":"Inv. Files","text":"prepare_posting_lists_for_querying\nsearch!","category":"page"},{"location":"invfile/#InvertedFiles.prepare_posting_lists_for_querying","page":"Inv. Files","title":"InvertedFiles.prepare_posting_lists_for_querying","text":"prepare_posting_lists_for_querying(idx::AbstractInvertedFile, q, pools=getpools(idx), tol=1e-6)\n\nFetches and prepares the involved posting lists to solve q\n\n\n\n\n\n","category":"function"},{"location":"invfile/#WeightedInvertedFile","page":"Inv. Files","title":"WeightedInvertedFile","text":"","category":"section"},{"location":"invfile/","page":"Inv. Files","title":"Inv. Files","text":"WeightedInvertedFile","category":"page"},{"location":"invfile/#InvertedFiles.WeightedInvertedFile","page":"Inv. Files","title":"InvertedFiles.WeightedInvertedFile","text":"struct WeightedInvertedFile <: AbstractInvertedFile\n\nAn inverted index is a sparse matrix representation of with floating point weights, it supports only positive non-zero values. This index is optimized to efficiently solve k nearest neighbors (cosine distance, using previously normalized vectors).\n\nParameters\n\nlists: posting lists (non-zero id-elements in rows)\nweights: non-zero weights (in rows)\nsizes: number of non-zero values in each element (non-zero values in columns)\nlocks: per-row locks for multithreaded construction\n\n\n\n\n\n","category":"type"},{"location":"invfile/#BinaryInvertedFile","page":"Inv. Files","title":"BinaryInvertedFile","text":"","category":"section"},{"location":"invfile/","page":"Inv. Files","title":"Inv. Files","text":"BinaryInvertedFile","category":"page"},{"location":"invfile/#InvertedFiles.BinaryInvertedFile","page":"Inv. Files","title":"InvertedFiles.BinaryInvertedFile","text":"struct BinaryInvertedFile <: AbstractInvertedFile\n\nCreates a binary weighted inverted index. An inverted index is an sparse matrix representation optimized for computing k nn elements (columns) under some distance.\n\nProperties:\n\ndist: Distance function to be applied, valid values are: IntersectionDissimilarity(), DiceDistance(), JaccardDistance(), and `CosineDistanceSet()\nlists: posting lists (non-zero values of the rows in the matrix)\nsizes: number of non-zero values per object (number of non-zero values per column)\nlocks: Per row locks for multithreaded construction\n\n\n\n\n\n","category":"type"},{"location":"invfile/#Sparse-matrices","page":"Inv. Files","title":"Sparse matrices","text":"","category":"section"},{"location":"invfile/","page":"Inv. Files","title":"Inv. Files","text":"Inverted indexes/files are representations of sparse matrices optimized for certain operations. We provide some functions to convert inverted files to sparse matrices.","category":"page"},{"location":"invfile/","page":"Inv. Files","title":"Inv. Files","text":"sparse\nsparsevec","category":"page"},{"location":"invfile/#SparseArrays.sparse","page":"Inv. Files","title":"SparseArrays.sparse","text":"sparse(idx::BinaryInvertedFile, one::Type{RealType}=1f0)\n\nCreates an sparse matrix (from SparseArrays) from idx using one as value.\n\n   I  \n   ↓    1 2 3 4 5 … n  ← J\n L[1] = 0 1 0 0 1 … 0\n L[2] = 1 0 0 1 0 … 1\n L[3] = 1 0 1 0 0 … 1\n ⋮\n L[m] = 0 0 1 1 0 … 0\n\n\n\n\n\nsparse(idx::WeightedInvertedFile)\n\nCreates an sparse matrix (from SparseArrays) from idx\n\n\n\n\n\n","category":"function"},{"location":"invfile/","page":"Inv. Files","title":"Inv. Files","text":"Inverted indexes constructors also support sparse matrices as input (wrapped on MatrixDatabase structs)","category":"page"},{"location":"invfile/#Dictionary-based-sparse-vectors","page":"Inv. Files","title":"Dictionary-based sparse vectors","text":"","category":"section"},{"location":"invfile/","page":"Inv. Files","title":"Inv. Files","text":"Some application domains could take advantage of hash based sparse vectors, and some of them are the target of InvertedFiles, therefore, the package also provide a partial implementation of sparse vectors using Dict.","category":"page"},{"location":"invfile/","page":"Inv. Files","title":"Inv. Files","text":"dvec\nDVEC\nSVEC\nSVEC32\nSVEC64\nnnz\nfindmax\nargmax\nmaximum\nfindmin\nargmin\nminimum\nnormalize!\ndot\nnorm\nzero\nadd!\nsum\n+\n-\n*\n/\ncentroid\nevaluate\nNormalizedAngleDistance\nNormalizedCosineDistance\nAngleDistance\nCosineDistance\nevaluate","category":"page"},{"location":"invfile/","page":"Inv. Files","title":"Inv. Files","text":"","category":"page"},{"location":"knr/","page":"KnrIndex","title":"KnrIndex","text":"\nCurrentModule = InvertedFiles\nDocTestSetup = quote\n    using InvertedFiles\nend","category":"page"},{"location":"knr/#KnrIndex","page":"KnrIndex","title":"KnrIndex","text":"","category":"section"},{"location":"knr/","page":"KnrIndex","title":"KnrIndex","text":"The KnrIndex index structure","category":"page"},{"location":"knr/","page":"KnrIndex","title":"KnrIndex","text":"KnrIndex\n````\n\n## Searching the index\nWe follow the searching api of `SimilaritySearch` such that you can use `searchbatch`, and `allknn` for free.\n","category":"page"},{"location":"knr/#InvertedFiles.KnrIndex","page":"KnrIndex","title":"InvertedFiles.KnrIndex","text":"struct KnrIndex <: AbstractSearchContext\n\nThe K nearest references inverted index\n\nParameters\n\ndist: the distance function of the index\ndb: the database of indexed objects\ncenters: a search index for a set of references\ninvfile: an inverted file data structure\nkbuild: the number of references to be computed and stored by each indexed object\nordering: specifies how the index performs final k nn selection\nopt: the parameters to be optimized by optimize!\n\n\n\n\n\n","category":"type"},{"location":"knr/","page":"KnrIndex","title":"KnrIndex","text":"@docs search","category":"page"},{"location":"knr/","page":"KnrIndex","title":"KnrIndex","text":"\n## Inserting elements into the index\n","category":"page"},{"location":"knr/","page":"KnrIndex","title":"KnrIndex","text":"@docs index! append! push!","category":"page"},{"location":"knr/","page":"KnrIndex","title":"KnrIndex","text":"\n## Ordering (reranking) strategies\nKnrOrderingStrategies, DistanceOrdering, InternalDistanceOrdering, DistanceOnTopKOrdering\n\n## Optimizing performance","category":"page"},{"location":"knr/","page":"KnrIndex","title":"KnrIndex","text":"@docs optimize!","category":"page"},{"location":"knr/","page":"KnrIndex","title":"KnrIndex","text":"\n## Computing references\nThe `KnrIndex` index uses a small set of references, that follow the dataset distribution to encode objects and\nsearch construct and search the index. Please note that in average, we expect $n/m$ posting lists if `kbuild=1`, and therefore this will be the number of elements to verify. In practice, the distribution is far from being uniform and vary with the data. In part, this can be manipulated with a proper selection of the set of references.\n","category":"page"},{"location":"knr/","page":"KnrIndex","title":"KnrIndex","text":"@docs references ```","category":"page"},{"location":"knr/","page":"KnrIndex","title":"KnrIndex","text":"The function references is a convenient function to select references efficiently and easily. In any case, it is possible to use any sampling or clustering algorithm to compute the set of references. See for example","category":"page"},{"location":"knr/","page":"KnrIndex","title":"KnrIndex","text":"KCenters.jl\nClustering.jl","category":"page"},{"location":"sparse/","page":"Sparse","title":"Sparse","text":"\nCurrentModule = InvertedFiles\nDocTestSetup = quote\n    using InvertedFiles\nend","category":"page"},{"location":"sparse/#Sparse-matrices","page":"Sparse","title":"Sparse matrices","text":"","category":"section"},{"location":"sparse/","page":"Sparse","title":"Sparse","text":"Inverted indexes/files are representations of sparse matrices optimized for certain operations. We provide some functions to convert inverted files to sparse matrices.","category":"page"},{"location":"sparse/","page":"Sparse","title":"Sparse","text":"sparse","category":"page"},{"location":"sparse/","page":"Sparse","title":"Sparse","text":"Inverted indexes constructors also support sparse matrices as input (wrapped on MatrixDatabase structs)","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = InvertedFiles","category":"page"},{"location":"#InvertedFiles.jl","page":"Home","title":"InvertedFiles.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"InvertedFiles.jl is a library for construction and searching of InvertedFiles. Despite its name, it only works for in memory representations.","category":"page"},{"location":"","page":"Home","title":"Home","text":"An inverted file is a sparse matrix that it is optimized to retrieve top-k columns under some distance function; in fact, it will compute k nearest neighbors. This package implements both binary and floating point weighted inverted files. The search api is identical to that found in SimilaritySearch.jl.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Additionally, it defines convertions to traditional sparse matrices and also a convenient sparse vector based on dictionaries (only basic methods are supported).","category":"page"}]
}
